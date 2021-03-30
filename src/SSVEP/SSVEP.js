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
    const nIntervId = setInterval(() => {
      body.style['background-color'] = body.style['background-color'] === 'black' ? 'white' : 'black';
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
      await countdown(10);
      description.style.display = 'none';
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  await waitKey('enter');
  start.style.display = 'none';
  await sleep(3 * 1000);
  await flashRounds([10, 20, 50, 100, 200, 250, 500, 1000], 3 * 1000);
  end.style.display = 'unset';
});
