// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // 监听SSVEP事件
  const SSVEPBtn = document.getElementById('SSVEP');
  SSVEPBtn.addEventListener('click', () => {
    ipcRenderer.send('open-SSVEP');
  });
  // 监听MI事件
  const MIBtn = document.getElementById('MI');
  MIBtn.addEventListener('click', () => {
    ipcRenderer.send('open-MI');
  });
});
