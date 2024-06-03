// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  enterUrl: (url: string) => ipcRenderer.send('url-enter', url),
  detectUrlChange: (callback: any) =>
    ipcRenderer.on('url-change', (e, data) => {
      console.log('ducnh e', data);

      callback(data);
    }),
  receive: (channel: string, func: any) => {
    const validChannels: any = ['url-change'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
