import { BrowserWindow } from 'electron';

export const ipcEventsList: {
  [key: string]: (evt: Electron.IpcMainEvent, args: unknown[]) => void;
} = {
  'create-window': (evt, args) => {
    const mainWindow = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
    const view = new BrowserWindow({
      width: 300,
      height: 500,
      x: 0,
      y: 0,
      alwaysOnTop: true,
      frame: false,
      transparent: true,
      parent: mainWindow,
      modal: true,
      show: false
    } as Electron.BrowserViewConstructorOptions);
    view.loadURL('https://www.baidu.com');
    view.once('ready-to-show', () => {
      view.show();
    });
    console.log(evt, args);
  }
};
