import { BrowserWindow, Menu, nativeImage, WebContentsView } from 'electron';
import DownloadIcon from '../assets/download.png';
import IncognitoIcon from '../assets/incognito.png';
import NewTabIcon from '../assets/new-tab.png';
import NewWindowIcon from '../assets/new-window.png';
import PasswordIcon from '../assets/password.png';
import SettingIcon from '../assets/setting.png';
import { TabContentView } from '../types/tab.type';
import { HOME_DOMAIN_NORMAL, SHOW_DEVTOOL_STORE_KEY } from '../utils/const';
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
      label: 'Quay lại',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        currentTabView?.view?.webContents?.goBack();
      },
      accelerator: 'Atl + Mũi tên trái'
    },
    {
      label: 'Tiến lên',
      // click: () => {},
      enabled: false,
      accelerator: 'Atl + Mũi tên phải'
    },
    {
      label: 'Tải lại',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        currentTabView?.view?.webContents?.reload();
      },
      accelerator: 'Ctrl + R'
    },
    { type: 'separator' },
    {
      label: 'Xem nguồn trang',
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
      },
      accelerator: 'Ctrl + U'
    },
    {
      label: 'Kiểm tra',
      click: () => {
        const currentTabId = getCurrentTabId(store);
        const currentTabView = tabsContentView.find((i) => i.tabId === currentTabId);
        store.set(SHOW_DEVTOOL_STORE_KEY, true);
        currentTabView?.view?.webContents?.inspectElement(clientX, clientY);
      },
      accelerator: 'F12'
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};

export const showCustomizeMenu = (data: {
  event: Electron.IpcMainEvent;
  mainWindow: BrowserWindow;
  controlView: WebContentsView;
  tabsContentView: TabContentView[];
  store: any;
  preloadUrl: string;
  setTabsContentView: (data: TabContentView[]) => void;
}) => {
  const { event, mainWindow, controlView, tabsContentView, store, preloadUrl, setTabsContentView } = data;

  const template: any[] = [
    {
      label: 'Tab mới',
      click: () => {
        createNewTab({
          mainWindow,
          controlView,
          tabsContentView,
          setTabsContentView: (tabsContent: TabContentView[]) => setTabsContentView(tabsContent),
          store,
          preloadUrl,
          newUrl: HOME_DOMAIN_NORMAL,
          nextTabLength: getTabsLength(store) + 1
        });
      },
      icon: nativeImage.createFromBuffer(Buffer.from(NewTabIcon)).resize({ width: 15, height: 15 }),
      accelerator: 'Ctrl + T'
    },
    {
      label: 'Cửa sổ mới',
      click: () => {
        console.log('haha');
      },
      enabled: false,
      icon: nativeImage.createFromBuffer(Buffer.from(NewWindowIcon)).resize({ width: 15, height: 15 }),
      accelerator: 'Ctrl + N'
    },
    {
      label: 'Ẩn danh',
      click: () => {
        console.log('haha');
      },
      icon: nativeImage.createFromBuffer(Buffer.from(IncognitoIcon)).resize({ width: 15, height: 15 }),
      accelerator: 'Ctrl + Shift + N'
    },

    { type: 'separator' },

    {
      label: 'Trình quản lý mật khẩu',
      click: () => {
        console.log('haha');
      },
      icon: nativeImage.createFromBuffer(Buffer.from(PasswordIcon)).resize({ width: 15, height: 15 })
    },
    {
      label: 'Tệp đã tải xuống',
      click: () => {
        console.log('haha');
      },
      enabled: false,
      icon: nativeImage.createFromBuffer(Buffer.from(DownloadIcon)).resize({ width: 15, height: 15 }),
      accelerator: 'Ctrl + J'
    },
    {
      label: 'Lịch sử',
      click: () => {
        console.log('haha');
      },
      accelerator: 'Ctrl + H'
    },
    {
      label: 'Xóa dữ liệu duyệt web',
      click: () => {
        console.log('haha');
      },
      accelerator: 'Ctrl + Shift + Del'
    },

    { type: 'separator' },

    {
      label: 'In',
      click: () => {
        console.log('haha');
      },
      accelerator: 'Ctrl + P'
    },
    {
      label: 'Chia sẻ                                      ',
      click: () => {
        console.log('haha');
      }
    },

    { type: 'separator' },

    {
      label: 'Trung tâm trợ giúp',
      click: () => {
        console.log('haha');
      }
    },
    {
      label: 'Cài đặt',
      click: () => {
        console.log('haha');
      },
      icon: nativeImage.createFromBuffer(Buffer.from(SettingIcon)).resize({ width: 15, height: 15 })
    },
    {
      label: 'Thoát',
      click: () => {
        console.log('haha');
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};
