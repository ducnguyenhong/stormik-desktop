// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { Bookmark } from './types/bookmark.type';
import { Tab } from './types/tab.type';

contextBridge.exposeInMainWorld('electronAPI', {
  enterUrl: (url: string) => ipcRenderer.send('url-enter', url),
  loadBookmarkUrl: (url: string) => ipcRenderer.send('load-bookmark-url', url),
  saveBookmark: () => ipcRenderer.send('save-bookmark'),
  removeBookmark: (id: string) => ipcRenderer.send('remove-bookmark', id),

  reloadPage: () => ipcRenderer.send('reload-page'),
  prevPage: () => ipcRenderer.send('prev-page'),
  nextPage: () => ipcRenderer.send('next-page'),

  changeTab: (tabId: string) => ipcRenderer.send('change-tab', tabId),
  newTab: () => ipcRenderer.send('new-tab'),
  closeTab: (tabId: string) => ipcRenderer.send('close-tab', tabId),

  newWindowFromTab: (tabId: string) => ipcRenderer.send('new-window-from-tab', tabId),

  openCustomize: () => ipcRenderer.send('open-customize'),

  effectTabChange: (callback: (data: Tab[]) => void) =>
    ipcRenderer.on('effect-tab-change', (_event, value) => callback(value)),

  effectNewTab: (callback: (data: boolean) => void) =>
    ipcRenderer.on('effect-new-tab', (_event, value) => callback(value)),

  effectChangeBookmarks: (callback: (data: Bookmark[]) => void) =>
    ipcRenderer.on('effect-bookmark-change', (_event, value) => callback(value)),

  effectSystemUrl: (callback: (data: string) => void) =>
    ipcRenderer.on('effect-system-url', (_event, value) => callback(value))
});

window.addEventListener('contextmenu', (e: any) => {
  e.preventDefault();
  ipcRenderer.send('show-context-menu', {
    targetUrl: e.target.href || e.srcElement?.parentNode?.href,
    clientX: e.clientX,
    clientY: e.clientY
  });
});
