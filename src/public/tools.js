const Mousetrap = require("mousetrap");

module.exports = {
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // 倒计时
  async countdown(s) {
    const countdownNode = document.getElementById("countdown");
    let times = s;
    countdownNode.textContent = times;
    return new Promise((resolve) => {
      const nIntervId = setInterval(() => {
        times -= 1;
        if (times <= 0) {
          clearInterval(nIntervId);
          resolve();
        } else {
          countdownNode.textContent = times;
        }
      }, 1000);
    });
  },

  // 等待按键继续
  async waitKey(key) {
    return new Promise((resolve) => {
      Mousetrap.bind(key, resolve, "keyup");
    });
  },
};
