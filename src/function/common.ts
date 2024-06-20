import { BrowserWindow, Menu, WebContentsView } from 'electron';
import { TabContentView } from '../types/tab.type';
import { SHOW_DEVTOOL_STORE_KEY } from '../utils/const';
import { createNewSourceTab, createNewTab, getCurrentTabId, getTabList, getTabsLength } from './tab';

export const showContextMenu = (data: {
  event: Electron.IpcMainEvent;
  mainWindow: BrowserWindow;
  controlView: WebContentsView;
  tabsContentView: TabContentView[];
  store: any;
  preloadUrl: string;
  setTabsContentView: (data: TabContentView[]) => void;
  targetData: any;
}) => {
  const { event, mainWindow, controlView, tabsContentView, store, preloadUrl, setTabsContentView, targetData } = data;

  const { targetUrl, clientX, clientY } = targetData || {};

  const template: any[] = [
    {
      label: 'Mở đường liên kết trong tab mới',
      click: () => {
        createNewTab({
          mainWindow,
          controlView,
          tabsContentView,
          setTabsContentView: (tabsContent: TabContentView[]) => setTabsContentView(tabsContent),
          store,
          preloadUrl,
          newUrl: targetUrl,
          nextTabLength: getTabsLength(store) + 1
        });
      },
      enabled: !!targetUrl
    },
    {
      label: 'Quay lại                                      Atl + Mũi tên trái',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        currentTabView?.view?.webContents?.goBack();
      }
    },
    {
      label: 'Tiến lên                                     Atl + Mũi tên phải',
      // click: () => {},
      enabled: false
    },
    {
      label: 'Tải lại                                                         Ctrl + R',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        currentTabView?.view?.webContents?.reload();
      }
    },
    { type: 'separator' },
    {
      label: 'Xem nguồn trang                                      Ctrl + U',
      click: () => {
        // view-source:
        const tabList = getTabList(store);
        const currentTabId = getCurrentTabId(store);
        const currentTab = tabList.find((i) => i.id === currentTabId);
        if (currentTab?.url) {
          createNewSourceTab({
            mainWindow,
            controlView,
            tabsContentView,
            setTabsContentView: (tabsContent: TabContentView[]) => setTabsContentView(tabsContent),
            store,
            preloadUrl,
            newUrl: `view-source:${currentTab.url}`
          });
        }
      }
    },
    {
      label: 'Kiểm tra                                                            F12',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        store.set(SHOW_DEVTOOL_STORE_KEY, true);
        currentTabView?.view?.webContents?.inspectElement(clientX, clientY);
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};
