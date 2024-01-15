// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { clipboard, contextBridge, ipcRenderer } from 'electron';
import path from 'path';

contextBridge.exposeInMainWorld('electron', {
  clipboard: {
    readText: clipboard.readText,
    writeText: clipboard.writeText
  },
  ipcRenderer,
  imgSrcMap: new Map<string, string>([
    ['xf', path.join(__dirname, '../../src/', 'assets', 'xf.png')]
  ])
});
