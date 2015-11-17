import notifier from './lib/notifier';
import events from '../common/events';

export default [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: () => notifier.emit(events.newFile)
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  }, {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => notifier.emit(events.reload)
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (() => process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11')(),
        click: () => notifier.emit(events.toggleFullscreen)
      },
      {
        label: 'Developer Tools',
        accelerator: (() => process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I')(),
        click: () => notifier.emit(events.toggleDeveloperTools)
      }
    ]
  }, {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  }, {
    label: 'Help',
    submenu: []
  }
];
