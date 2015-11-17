import App from 'app';
import {loadApplicationMenu} from './lib/menu';
import Window from './lib/window';
import mainMenuTemplate from './main-menu';
import notifier from './lib/notifier';
import events from '../common/events';
import server from '../server/server';

import 'electron-debug';

let serverStarted = false;
let serverInstance = null;

function createNewWindow() {
  let window = new Window();
  window.focus();
}

function startServer () {
  serverInstance = server.listen(9099, () => {
    serverStarted = true;
    console.log(`Express Server listening on port ${server.get('port')} in ${server.get('env')} mode`); // eslint-disable-line no-console
    createNewWindow();
    notifier.emit(events.serverStarted, {port: server.get('port'), env: server.get('env')});
  });
}

App.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    App.quit();
  }
});

App.on('quit', () => {
  if (serverInstance && serverStarted) {
    serverStarted = false;
    serverInstance.close();
    serverInstance = null;
  }
});

App.on('activate-with-no-open-windows', () => {
  if (!Window.hasWindows()) {
    createNewWindow();
  }
});

App.on('ready', () => {
  loadApplicationMenu(mainMenuTemplate);

  if (serverStarted)
    createNewWindow();
  else
    startServer();
});

notifier.on(events.newFile, () => {
  createNewWindow();
});


notifier.on(events.toggleDeveloperTools, () => {
  const focusedWindow = Window.focusedWindow();
  if (focusedWindow)
    focusedWindow.toggleDevTools();
});

notifier.on(events.reload, () => {
  const focusedWindow = Window.focusedWindow();
  if (focusedWindow)
    focusedWindow.browserWindow.reload();
});

notifier.on(events.toggleFullscreen, () => {
  const focusedWindow = Window.focusedWindow();
  if (focusedWindow)
    focusedWindow.toggleFullscreen();
});
