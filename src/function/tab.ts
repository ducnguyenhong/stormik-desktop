import { WebContentsView } from 'electron';
import { v4 as uuidV4 } from 'uuid';
import { CONTROL_HEIGHT } from '../main';
import { Tab } from '../types/tab.type';
import { HOME_DOMAIN, SHOW_DEVTOOL_STORE_KEY, TABS_STORE_KEY } from '../utils/const';

export const createNewTab = (
  mainWindow: any,
  headerView: WebContentsView,
  tabList: any,
  store: any,
  preloadUrl: string,
  newUrl: string,
  setCurrentTabId: (id: string) => void
) => {
  const newBodyView = new WebContentsView({
    webPreferences: {
      preload: preloadUrl,
      sandbox: true
    }
  });
  mainWindow.contentView.addChildView(newBodyView, tabList.length + 1);

  newBodyView.setBounds({
    x: 0,
    y: CONTROL_HEIGHT,
    width: mainWindow.getContentBounds().width,
    height: mainWindow.getContentBounds().height - CONTROL_HEIGHT
  });

  const newTabId = uuidV4();

  tabList.push({
    id: newTabId,
    view: newBodyView,
    index: tabList.length
  });

  newBodyView.webContents.loadURL(newUrl).then(() => {
    const oldTabList: Tab[] = store.get(TABS_STORE_KEY) || [];

    store.set(TABS_STORE_KEY, [
      ...oldTabList.map((i) => ({ ...i, isActive: false })),
      {
        title: 'Thẻ mới',
        url: HOME_DOMAIN,
        id: newTabId,
        isActive: true
      }
    ]);
    setCurrentTabId(newTabId);
    headerView.webContents.send('detect-new-tab', newTabId);
  });

  newBodyView.webContents.on('devtools-closed', () => {
    const showDevtool = store.get(SHOW_DEVTOOL_STORE_KEY);
    if (showDevtool) {
      store.set(SHOW_DEVTOOL_STORE_KEY, false);
    }
  });

  newBodyView.webContents.setWindowOpenHandler((data) => {
    createNewTab(mainWindow, headerView, tabList, store, preloadUrl, data.url, (id) => {
      setCurrentTabId(id);
    });
    return { action: 'deny' };
  });

  // Open the DevTools.
  newBodyView.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      event.preventDefault();
      const showDevtool = store.get(SHOW_DEVTOOL_STORE_KEY);
      if (showDevtool) {
        store.set(SHOW_DEVTOOL_STORE_KEY, false);
        headerView.webContents.closeDevTools();
      } else {
        store.set(SHOW_DEVTOOL_STORE_KEY, true);
        headerView.webContents.openDevTools();
      }
    }
  });

  for (let i = 0; i < tabList.length; i++) {
    if (i === tabList.length - 1) {
      tabList?.[i].view?.setVisible(true);
    } else {
      tabList?.[i].view?.setVisible(false);
    }
  }
};

export const effectChangeTabs = (headerView: WebContentsView, tabsData: Tab[]) => {
  headerView.webContents.send(
    'effect-tab-change',
    tabsData.map((i) => ({ ...i, view: undefined }))
  );
};
