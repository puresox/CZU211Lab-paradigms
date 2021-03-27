// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const SerialPort = require('serialport');
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout');

const port = new SerialPort(
  'COM3',
  {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
  },
  (err) => {
    if (err) {
      console.error('Error: ', err.message);
    }
  },
);
const parser = port.pipe(
  new InterByteTimeout({ interval: 30 }),
);
parser.on('data', console.log);
// 监听写入串口事件
ipcMain.on('sendTrigger', () => {
  port.write([0x01, 0x04, 0x00, 0x00], (err) => {
    if (err) {
      console.log('Error on write: ', err.message);
    }
    console.error('message written');
  });
});
