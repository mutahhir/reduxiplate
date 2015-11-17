import dialog from 'dialog';
import BrowserWindow from 'browser-window';
import IPC from 'ipc';
import q from 'q';
import fs from 'fs';
import path from 'path';

import events from '../../common/events';


const defaultWindowBounds = {
  width: 1024,
  height: 768
};

export default class Window {
  constructor (path, url) {

    Window.add(this);
    Window.handleIPCEvents();

    this.path = path;
    this.loaded = false;
    this.content = '';
    if (this.path) {
      this.content = fs.readFileSync(this.path, {encoding: 'utf8'});
    }

    this.browserWindow = new BrowserWindow(defaultWindowBounds);
    this.browserWindow.loadUrl(url || 'http://localhost:9099');
    this.browserWindow.webContents.on('did-finish-load', this.onWindowLoaded.bind(this));
  }

  onWindowLoaded () {
    this.loaded = true;
  }

  setTitle () {
    var info = require('../../../package.json');

    if (this.path)
      this.browserWindow.setTitle(`${info.productName} - ${path.basename(this.path)}`);
  }

  setContent (content) {
    this.content = content;
    this.browserWindow.setDocumentEdited(true);
  }

  setPath (path) {
    if (path !== this.path && !!path) {
      this.path = path;
      this.setTitle();
      this.browserWindow.setRepresentedFilename(this.path);
      this.browserWindow.setDocumentEdited(false);
    }
  }

  saveFile (path) {
    const save = (filePath) => {
      return q.fcall(fs.writeFile, filePath, this.content, {encoding: 'utf8'})
        .then((err) => {
          if (err) {
            throw err;
          }

          this.browserWindow.setDocumentEdited(false);
        })
        .catch((err) => {
          throw err;
        });
    };

    if (path) {
      this.setPath(path);
    }

    if (!this.path) {
      // need to show save dialog
      return q.fcall(dialog.showSaveDialog, this.browserWindow, {title: 'Save File'})
        .then((filePath) => {
          if (!filePath) return;

          this.setPath(filePath);
          return save(filePath);
        });
    } else {
      return save(this.path);
    }
  }

  focus () {
    this.browserWindow.focus();
  }

  toggleDevTools () {
    this.browserWindow.toggleDevTools();
  }

  toggleFullscreen () {
    this.browserWindow.setFullScreen(!this.browserWindow.isFullScreen());
  }

  //
  // Static methods
  //
  static add (window) {
    if (!this.windows)
      this.windows = [];

    this.windows.push(window);
  }

  static remove (window) {
    let windows = this.windows;

    if (!windows || windows.length === 0)
      return;

    const windowIndex = this.windows.indexOf(window);

    if (windowIndex >= 0) {
      windows.splice(windowIndex, 1);
    }
  }

  static closeAllWindows () {
    if (!this.windows)
      return;

    this.windows.forEach(window => window.close());
  }

  static hasWindows () {
    return !!this.windows && this.windows.length > 0;
  }

  static findWindowFromBrowserWindow (browserWindow) {
    if (!this.windows || this.windows.length === 0 || !browserWindow)
      return null;

    return this.windows.find((window) => window.browserWindow.id === browserWindow.id);
  }

  static focusedWindow () {
    return this.findWindowFromBrowserWindow(BrowserWindow.getFocusedWindow());
  }

  static handleIPCEvents() {
    if (this.__eventsHandlerActive)
      return;

    this.__eventsHandlerActive = true;

    IPC.on(events.getFileContents, (event) => {
      const sender = event.sender.getOwnerBrowserWindow();
      const window = this.findWindowFromBrowserWindow(sender);
      event.returnValue = window.content;
    });

    IPC.on(events.fileContentsChanged, (event, contents) => {
      const sender = event.sender.getOwnerBrowserWindow();
      const window = this.findWindowFromBrowserWindow(sender);

      window.setContent(contents);
    });
  }

}
