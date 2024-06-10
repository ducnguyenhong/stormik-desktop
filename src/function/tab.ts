import { BrowserWindow, WebContentsView } from 'electron';
import { v4 as uuidV4 } from 'uuid';
import { CONTROL_HEIGHT } from '../main';
import { Tab, TabContentView } from '../types/tab.type';
import { CURRENT_TAB_ID_STORE_KEY, HOME_DOMAIN, SHOW_DEVTOOL_STORE_KEY, TABS_STORE_KEY } from '../utils/const';

export const effectChangeTabs = (controlView: WebContentsView, tabsData: Tab[]) => {
  controlView.webContents.send(
    'effect-tab-change',
    tabsData.map((i) => ({ ...i, view: undefined }))
  );
};

export const setTabList = (store: any, tabs: Tab[]) => {
  store.set(TABS_STORE_KEY, tabs);
};

export const getTabList = (store: any) => {
  return (store.get(TABS_STORE_KEY) || []) as Tab[];
};

export const setCurrentTabId = (store: any, id: string) => {
  store.set(CURRENT_TAB_ID_STORE_KEY, id);
};

export const getCurrentTabId = (store: any) => {
  return (store.get(CURRENT_TAB_ID_STORE_KEY) || '') as string;
};

export const createNewTab = (data: {
  mainWindow: BrowserWindow;
  controlView: WebContentsView;
  store: any;
  preloadUrl: string;
  newUrl: string;
  setTabsContentView: (data: TabContentView[]) => void;
  tabsContentView: TabContentView[];
}) => {
  const { mainWindow, controlView, store, preloadUrl, newUrl, setTabsContentView, tabsContentView } = data;
  const newTabId = uuidV4();

  const bodyView = new WebContentsView({
    webPreferences: {
      preload: preloadUrl,
      sandbox: true
    }
  });

  const defaultTabList = getTabList(store);
  mainWindow.contentView.addChildView(bodyView, defaultTabList.length);

  bodyView.setBounds({
    x: 0,
    y: CONTROL_HEIGHT,
    width: mainWindow.getContentBounds().width,
    height: mainWindow.getContentBounds().height - CONTROL_HEIGHT
  });

  bodyView.webContents.loadURL(newUrl).then(() => {
    const tabList = getTabList(store);
    const newTabList = tabList.map((item) => ({ ...item, isActive: false }));

    newTabList.push({
      id: newTabId,
      index: tabList.length,
      isActive: true,
      title: 'Thẻ mới',
      url: HOME_DOMAIN,
      isLoading: false
    });

    setTabsContentView([...tabsContentView, { view: bodyView, tabId: newTabId }]);
    setCurrentTabId(store, newTabId);
    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.on('will-navigate', (e, url) => {
    const tabList = getTabList(store);
    const newTabList = tabList.map((item) => {
      if (item.isActive) {
        return { ...item, url, isLoading: true };
      }
      return item;
    });

    setTabList(store, newTabList);
    effectChangeTabs(controlView, newTabList);
  });

  bodyView.webContents.on('did-navigate', () => {
    const tabList = getTabList(store);
    // addHistory(store, {
    //   url: bodyView.webContents.getURL(),
    //   type: 'URL',
    //   domain: getDomainName(bodyView.webContents.getURL()),
    //   title: bodyView.webContents.getTitle()
    // });

    const newTabList = tabList.map((item) => {
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
    const tabList = getTabList(store);
    const newTabList = tabList.map((item) => {
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

  bodyView.webContents.on('devtools-closed', () => {
    const showDevtool = store.get(SHOW_DEVTOOL_STORE_KEY);
    if (showDevtool) {
      store.set(SHOW_DEVTOOL_STORE_KEY, false);
    }
  });

  bodyView.webContents.setWindowOpenHandler((data) => {
    createNewTab({
      mainWindow,
      controlView,
      store,
      preloadUrl,
      newUrl: data.url,
      tabsContentView,
      setTabsContentView: (tabsContent: TabContentView[]) => setTabsContentView(tabsContent)
    });
    return { action: 'deny' };
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
