// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  enterUrl: (url: string) => ipcRenderer.send('url-enter', url),
  reload: () => ipcRenderer.send('reload'),
  detectUrlChange: (callback: (data: string) => void) => {
    console.log('ducnh callback', callback);

    ipcRenderer.on('url-change', (e, data) => callback(data));
  }
});
