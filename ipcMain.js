// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain, BrowserWindow, dialog, screen, app } = require("electron");
const path = require("path");

// 监听打开SSVEP范式窗口的消息
ipcMain.on("open-SSVEP", () => {
  if (!global.SSVEPWin) {
    global.SSVEPWin = new BrowserWindow({
      fullscreen: true,
      simpleFullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "./src/SSVEP/SSVEP.js"),
      },
    });
    global.SSVEPWin.on("close", () => {
      global.SSVEPWin = null;
    });
    if (!app.isPackaged) {
      // Open the DevTools.
      global.SSVEPWin.webContents.openDevTools();
    }
    global.SSVEPWin.loadFile(path.join(__dirname, "./src/SSVEP/SSVEP.html"));
  }
});

// 监听打开SSVEP1范式窗口的消息
ipcMain.on("open-SSVEP1", () => {
  if (!global.SSVEP1Win) {
    global.SSVEP1Win = new BrowserWindow({
      fullscreen: true,
      simpleFullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "./src/SSVEP1/SSVEP1.js"),
      },
    });
    global.SSVEP1Win.on("close", () => {
      global.SSVEP1Win = null;
    });
    if (!app.isPackaged) {
      // Open the DevTools.
      global.SSVEP1Win.webContents.openDevTools();
    }
    global.SSVEP1Win.loadFile(path.join(__dirname, "./src/SSVEP1/SSVEP1.html"));
  }
});

// 监听打开MI范式窗口的消息
ipcMain.on("open-MI", () => {
  if (!global.MIWin) {
    global.MIWin = new BrowserWindow({
      fullscreen: true,
      simpleFullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "./src/MI/MI.js"),
      },
    });
    global.MIWin.on("close", () => {
      global.MIWin = null;
    });
    if (!app.isPackaged) {
      // Open the DevTools.
      global.MIWin.webContents.openDevTools();
    }
    global.MIWin.loadFile(path.join(__dirname, "./src/MI/MI.html"));
  }
});
// // 监听打开userDetail窗口的消息
// ipcMain.on('open-userDetail', (event, user) => {
//   let userDetailWin = new BrowserWindow({
//     width: 700,
//     height: screen.getPrimaryDisplay().size.height,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//       // preload: path.join(__dirname, '../assets/userDetail.js'),
//     }
//   })
//   userDetailWin.webContents.on('dom-ready', () => {
//     // 传递用户信息
//     userDetailWin.webContents.send('getUser', user)
//     // 获取打印设备
//     const printers = userDetailWin.webContents.getPrinters()
//     userDetailWin.webContents.send('getPrinters', printers)
//   })
//   userDetailWin.on('close', () => {
//     userDetailWin = null
//   })
//   userDetailWin.loadFile(path.join(__dirname, '../sections/userDetail.html'))
// })
// // 监听选择文件夹事件
// ipcMain.handle('selectAppDataPath', async () => {
//   const {
//     canceled,
//     filePaths: [dir]
//   } = await dialog.showOpenDialog({
//     properties: ['openDirectory', 'promptToCreate']
//   })
//   if (!canceled && dir) {
//     return dir
//   }
//   return ''
// })
// // 监听打印事件
// ipcMain.on('print', (event, options) => {
//   BrowserWindow.getFocusedWindow().webContents.print(
//     options,
//     (success, errorType) => {
//       if (!success) console.log(errorType)
//     }
//   )
// })
// // 监听获取设置事件
// ipcMain.handle('getSetting', async (event, key) => settings.getSync(key))
// // 监听设置设置事件
// ipcMain.on('setSetting', (event, key, value) => {
//   settings.setSync(key, value)
// })
// // 监听计算指标事件
// ipcMain.on('calcIndicators', (event, user) => {
//   let calcIndicatorsWin = new BrowserWindow({
//     show: false,
//     webPreferences: {
//       preload: path.join(__dirname, '../assets/calcIndicators.js')
//     }
//   })
//   calcIndicatorsWin.once('ready-to-show', () => {
//     // 传递用户信息
//     calcIndicatorsWin.webContents.send('getUser', user)
//   })
//   calcIndicatorsWin.on('close', () => {
//     calcIndicatorsWin = null
//   })
//   calcIndicatorsWin.loadFile(path.join(__dirname, '../sections/blank.html'))
// })
// // 监听刷新主页事件
// ipcMain.on('reloadIndex', () => {
//   global.mainWindow.reload()
// })
