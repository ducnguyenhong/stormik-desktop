// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { Tab } from './types/tab.type';

contextBridge.exposeInMainWorld('electronAPI', {
  enterUrl: (url: string) => ipcRenderer.send('url-enter', url),
  loadBookmarkUrl: (url: string) => ipcRenderer.send('load-bookmark-url', url),
  reloadPage: () => ipcRenderer.send('reload-page'),
  prevPage: () => ipcRenderer.send('prev-page'),
  nextPage: () => ipcRenderer.send('next-page'),
  changeTab: (id: string) => ipcRenderer.send('change-tab', id),
  newTab: () => ipcRenderer.send('new-tab'),
  closeTab: (id: string) => ipcRenderer.send('close-tab', id),

  // detectUrlChange: (callback: (data: string) => void) => {
  //   console.log('ducnh callback', callback);

  //   ipcRenderer.on('url-change', (e, data) => callback(data));
  // },
  // detectTabChange: (channel: string, callback: (data: Tab[]) => void) => {
  //   console.log('ducnh huhu');
  //   return ipcRenderer.on(channel, (e, data) => callback(data));
  // },

  effectTabChange: (callback: (data: Tab[]) => void) =>
    ipcRenderer.on('effect-tab-change', (_event, value) => callback(value))
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  ipcRenderer.send('show-context-menu');
});
