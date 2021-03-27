// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // 监听提交事件
  const SSVEPBtn = document.getElementById('SSVEP');
  SSVEPBtn.addEventListener('click', () => {
    ipcRenderer.send('open-SSVEP');
  });
});
