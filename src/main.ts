import { app, BrowserWindow, ipcMain, WebContentsView } from 'electron';
import Store from 'electron-store';
import { v4 as uuidV4 } from 'uuid';
import packageJson from '../package.json';
import {
  createNewTab,
  effectChangeTabs,
  getCurrentTabId,
  getTabList,
  setCurrentTabId,
  setTabList
} from './function/tab';
import { TabContentView } from './types/tab.type';
import { HOME_DOMAIN, SHOW_DEVTOOL_STORE_KEY, TABS_STORE_KEY } from './utils/const';
import { addHistory, getDomainName, getLastHistory } from './utils/helper';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const store: any = new Store();

export const CONTROL_HEIGHT = 115; // px

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  let tabsContentView: TabContentView[] = [];

  const mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    height: 1080,
    width: 1920,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: true,
      webviewTag: true
      // contextIsolation: true
    },
    title: `Trình duyệt Stormik - ${packageJson.version}`
  });

  mainWindow.removeMenu();
  mainWindow.maximize();

  const controlView = new WebContentsView({
    webPreferences: {
      // contextIsolation: true,
      // nodeIntegration: true,
      // allowRunningInsecureContent: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });
  const bodyView = new WebContentsView({
    webPreferences: {
      // contextIsolation: true,
      // nodeIntegration: true,
      // allowRunningInsecureContent: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: true
    }
  });
  mainWindow.contentView.addChildView(controlView);
  mainWindow.contentView.addChildView(bodyView, 0);

  controlView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getContentBounds().width,
    height: CONTROL_HEIGHT
  });
  controlView.webContents.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  bodyView.setBounds({
    x: 0,
    y: CONTROL_HEIGHT,
    width: mainWindow.getContentBounds().width,
    height: mainWindow.getContentBounds().height - CONTROL_HEIGHT
  });

  bodyView.webContents.loadURL(HOME_DOMAIN).then(() => {
    const newTabId = uuidV4();
    store.set(TABS_STORE_KEY, [
      {
        title: 'Thẻ mới',
        url: HOME_DOMAIN,
        id: newTabId,
        isActive: true
      }
    ]);
    setCurrentTabId(store, newTabId);
    const newTabList = [];
    newTabList.push({
      id: newTabId,
      index: 0,
      isActive: true,
      title: 'Thẻ mới',
      url: HOME_DOMAIN,
      isLoading: false
    });
    tabsContentView.push({ view: bodyView, tabId: newTabId });
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.on('will-navigate', (e, url) => {
    const oldTabList = getTabList(store);
    const newTabList = oldTabList.map((item) => {
      if (item.isActive) {
        return { ...item, url, isLoading: true };
      }
      return item;
    });

    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.on('did-navigate', () => {
    addHistory(store, {
      url: bodyView.webContents.getURL(),
      type: 'URL',
      domain: getDomainName(bodyView.webContents.getURL()),
      title: bodyView.webContents.getTitle()
    });

    const oldTabList = getTabList(store);
    const newTabList = oldTabList.map((item) => {
      if (item.isActive) {
        return {
          ...item,
          url: bodyView.webContents.getURL(),
          title: bodyView.webContents.getTitle(),
          isLoading: true
        };
      }
      return item;
    });
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.on('did-finish-load', () => {
    const oldTabList = getTabList(store);
    const newTabList = oldTabList.map((item) => {
      if (item.isActive) {
        return {
          ...item,
          title: bodyView.webContents.getTitle(),
          isLoading: false
        };
      }
      return item;
    });
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.setWindowOpenHandler((data) => {
    createNewTab({
      mainWindow,
      controlView,
      tabsContentView,
      setTabsContentView: (tabsContent: TabContentView[]) => {
        tabsContentView = tabsContent;
      },
      store,
      preloadUrl: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      newUrl: data.url
    });
    return { action: 'deny' };
  });

  ipcMain.on('url-enter', (e, data) => {
    bodyView.webContents.loadURL(data);
  });

  ipcMain.on('load-bookmark-url', (e, data) => {
    bodyView.webContents.loadURL(data);
  });

  ipcMain.on('reload-page', () => {
    bodyView.webContents.reload();
    bodyView.webContents.scrollToTop();
  });

  ipcMain.on('new-tab', () => {
    createNewTab({
      mainWindow,
      controlView,
      tabsContentView,
      setTabsContentView: (tabsContent: TabContentView[]) => {
        tabsContentView = tabsContent;
      },
      store,
      preloadUrl: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      newUrl: HOME_DOMAIN
    });
  });

  ipcMain.on('change-tab', (e, tabId: string) => {
    const tabList = getTabList(store);

    for (let i = 0; i < tabsContentView.length; i++) {
      if (tabsContentView[i].tabId === tabId) {
        tabsContentView?.[i]?.view?.setVisible(true);
      } else {
        tabsContentView?.[i]?.view?.setVisible(false);
      }
    }

    const newTabList = tabList.map((i) => ({ ...i, isActive: i.id === tabId }));
    setCurrentTabId(store, tabId);
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  ipcMain.on('close-tab', (e, tabId: string) => {
    const currentTabId = getCurrentTabId(store);
    const isCurrentTab = tabId === currentTabId;
    const tabList = getTabList(store);
    const closeTabIndex = tabList.findIndex((i) => i.id === tabId);

    if (closeTabIndex) {
      tabsContentView?.[closeTabIndex]?.view?.webContents?.close();
      tabsContentView?.[closeTabIndex]?.view?.setVisible(false);
    }

    const newTabList = tabList.filter((i) => i.id !== tabId).map((i, idx) => ({ ...i, isActive: idx === 0 }));

    tabsContentView = tabsContentView.filter((i) => i.tabId !== tabId);

    if (isCurrentTab) {
      for (let i = 0; i < tabsContentView.length; i++) {
        if (i === 0) {
          tabsContentView?.[i]?.view?.setVisible(true);
        } else {
          tabsContentView?.[i]?.view?.setVisible(false);
        }
      }
    }
    setCurrentTabId(store, newTabList[0].id);
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  ipcMain.on('prev-page', () => {
    const lastHistory = getLastHistory(store);
    if (lastHistory?.url) {
      bodyView.webContents.loadURL(lastHistory.url);
    }
  });

  bodyView.webContents.on('devtools-closed', () => {
    const showDevtool = store.get(SHOW_DEVTOOL_STORE_KEY);
    if (showDevtool) {
      store.set(SHOW_DEVTOOL_STORE_KEY, false);
    }
  });

  // Open the DevTools.
  bodyView.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      event.preventDefault();
      const showDevtool = store.get(SHOW_DEVTOOL_STORE_KEY);
      if (showDevtool) {
        store.set(SHOW_DEVTOOL_STORE_KEY, false);
        controlView.webContents.closeDevTools();
      } else {
        store.set(SHOW_DEVTOOL_STORE_KEY, true);
        controlView.webContents.openDevTools();
      }
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
