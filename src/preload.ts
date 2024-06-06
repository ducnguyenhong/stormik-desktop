// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  enterUrl: (url: string) => ipcRenderer.send('url-enter', url),
  reload: () => ipcRenderer.send('reload'),
  prevPage: () => ipcRenderer.send('prev-page'),
  nextPage: () => ipcRenderer.send('next-page'),
  changeTab: (id: string) => ipcRenderer.send('change-tab', id),
  newTab: () => ipcRenderer.send('new-tab'),

  // detectUrlChange: (callback: (data: string) => void) => {
  //   console.log('ducnh callback', callback);

  //   ipcRenderer.on('url-change', (e, data) => callback(data));
  // },
  // detectTabChange: (channel: string, callback: (data: Tab[]) => void) => {
  //   console.log('ducnh huhu');
  //   return ipcRenderer.on(channel, (e, data) => callback(data));
  // },

  detectTabChange: (callback: any) => ipcRenderer.on('detect-tab-change', (_event, value) => callback(value)),

  detectNewTab: (callback: any) => ipcRenderer.on('detect-new-tab', (_event, value) => callback(value))
});
