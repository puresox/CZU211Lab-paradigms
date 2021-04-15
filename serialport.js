// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain, dialog } = require("electron");
const SerialPort = require("serialport");
const InterByteTimeout = require("@serialport/parser-inter-byte-timeout");

// 开串口
const port = new SerialPort(
  "COM3",
  {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
  },
  (err) => {
    if (err) {
      dialog.showErrorBox(
        "错误",
        "未检测到打标器，请连接打标器后重新打开此应用"
      );
    }
  }
);

const parser = port.pipe(new InterByteTimeout({ interval: 30 }));
parser.on("data", console.log);

// 监听写入串口事件
ipcMain.on("sendTrigger", (event, value) => {
  port.write([0x01, 0xe1, 0x01, 0x00, value], (err) => {
    if (err) {
      dialog.showErrorBox("错误", err.message);
    }
  });
});
