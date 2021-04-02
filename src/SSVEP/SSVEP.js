/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const Mousetrap = require('mousetrap');
const { sleep, countdown, waitKey } = require('../public/tools');

// 按esc键退出
Mousetrap.bind(
  'esc',
  () => {
    window.close();
  },
  'keyup',
);

// 闪烁s秒
async function flashByRate(rate, s) {
  const [body] = document.getElementsByTagName('body');
  return new Promise((resolve) => {
    const nIntervId = setInterval(async () => {
      // 闪烁一次
      body.style['background-color'] = 'black';
      await sleep(40);
      body.style['background-color'] = 'white';
    }, 1000 / rate);
    setTimeout(() => {
      clearInterval(nIntervId);
      body.style['background-color'] = 'white';
      resolve();
    }, s);
  });
}

async function flashRounds(rateArray, duration) {
  const description = document.getElementById('description');
  for (let index = 0; index < rateArray.length; index += 1) {
    const rate = rateArray[index];
    ipcRenderer.send('sendTrigger', index);
    await flashByRate(rate, duration);
    if (index < rateArray.length - 1) {
      description.style.display = 'unset';
      await countdown(5);
      description.style.display = 'none';
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  await waitKey('enter');
  start.style.display = 'none';
  await sleep(2 * 1000);
  await flashRounds([7.5, 10, 12, 15, 20], 10 * 1000);
  end.style.display = 'unset';
});
