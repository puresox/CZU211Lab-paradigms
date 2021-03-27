const Mousetrap = require('mousetrap');

Mousetrap.bind(
  '4',
  () => {
    console.log('4');
  },
  'keyup',
);
// 按esc键退出
Mousetrap.bind(
  'esc',
  () => {
    window.close();
  },
  'keyup',
);
