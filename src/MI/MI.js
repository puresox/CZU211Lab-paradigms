/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const Mousetrap = require('mousetrap');
const _ = require('lodash');
const { sleep, countdown, waitKey } = require('../public/tools');

const rounds = 5;
const turns = 8;

// 打乱箭头顺序
const array = [];
for (let index = 0; index < rounds * turns; index += 1) {
  array.push(index % 2);
}
const shuffledArray = _.shuffle(array);

// 按esc键退出
Mousetrap.bind(
  'esc',
  () => {
    window.close();
  },
  'keyup',
);

// 显示图片s秒
async function showPicSeconds(s, picPath) {
  const pic = document.getElementById('pic');
  pic.src = picPath;
  await sleep(s * 1000);
}

// 本实验共五轮，每轮八次试验，每次试验包括2秒的准备时间和2秒的正式试验
async function MIRounds() {
  const description = document.getElementById('description');
  const pic = document.getElementById('pic');
  for (let i = 0; i < rounds; i += 1) {
    for (let j = 0; j < turns; j += 1) {
      // 左1右2
      const trigger = shuffledArray.pop();
      pic.className = 'cross';
      await showPicSeconds(2, './cross.png');
      ipcRenderer.send('sendTrigger', trigger + 1);
      const picPath = trigger === 0 ? './leftArrow.png' : './rightArrow.png';
      pic.className = 'arrow';
      await showPicSeconds(2, picPath);
    }
    if (i < rounds - 1) {
      pic.style.display = 'none';
      description.style.display = 'unset';
      await countdown(10);
      description.style.display = 'none';
      pic.style.display = 'unset';
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const pic = document.getElementById('pic');
  await waitKey('enter');
  start.style.display = 'none';
  pic.style.display = 'unset';
  await MIRounds();
  pic.style.display = 'none';
  end.style.display = 'unset';
});
