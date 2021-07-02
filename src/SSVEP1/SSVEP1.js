/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require("electron");
const Mousetrap = require("mousetrap");
const lodash = require("lodash");
const { sleep, countdown, waitKey } = require("../public/tools");

const rounds = 40;

// 打乱箭头顺序
const array = [];
for (let index = 0; index < rounds; index += 1) {
  array.push(index % 4);
}
const shuffledArray = lodash.shuffle(array);

// 按esc键退出
Mousetrap.bind(
  "esc",
  () => {
    window.close();
  },
  "keyup"
);

// 显示图片s秒
async function showPicSeconds(num, s) {
  const pic = document.getElementById(`cross${num}`);
  pic.style.display = "unset";
  await sleep(s * 1000);
  pic.style.display = "none";
  await sleep(10);
}

// 闪烁s秒
async function flashByRate(rateArray, s) {
  const squaresArray = document.getElementsByClassName("square");
  const nIntervId = [];
  return new Promise((resolve) => {
    rateArray.forEach((rate, index) => {
      nIntervId.push(
        setInterval(async () => {
          // 闪烁一次
          squaresArray[index].style["background-color"] = "white";
          await sleep(40);
          squaresArray[index].style["background-color"] = "black";
        }, 1000 / rate)
      );
    });
    setTimeout(() => {
      rateArray.forEach((_, index) => {
        clearInterval(nIntervId[index]);
        squaresArray[index].style["background-color"] = "black";
      });
      resolve();
    }, s);
  });
}

async function flashRounds(rateArray, duration) {
  const description = document.getElementById("description");
  const squares = document.getElementById("squares");
  for (let index = 0; index < rounds; index += 1) {
    const trigger = shuffledArray.pop();
    squares.style.display = "flex";
    await showPicSeconds(trigger + 1, 3);
    ipcRenderer.send("sendTrigger", trigger + 1);
    await flashByRate(rateArray, duration);
    squares.style.display = "none";
    if (index < rounds - 1) {
      description.style.display = "unset";
      await countdown(5); // 休息5s
      description.style.display = "none";
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  await waitKey("enter");
  start.style.display = "none";
  await sleep(2 * 1000);
  await flashRounds([7.5, 8.57, 10, 12], 5 * 1000);
  end.style.display = "unset";
});
