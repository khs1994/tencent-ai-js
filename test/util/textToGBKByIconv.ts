import * as iconv from 'iconv-lite';
// import gbk = require('gbk.js');

// 编码为 gbk 并进行 urlencode
export default function(text: string) {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  let str = iconv.encode(text, 'gbk');
  // let str = gbk.encode(text);
  let strList = '';
  str.map((item): any => {
    switch (true) {
      // ascii 0
      case item === 0:
        strList += '%00';
        break;
      // 空格转为+号
      case item === 32:
        strList += '+';
        break;
      // 原样输出
      case item === 42 ||
        item === 45 ||
        item === 46 ||
        item === 95 ||
        (item >= 48 && item <= 57) ||
        (item >= 65 && item <= 90) ||
        (item >= 97 && item <= 122):
        strList += String.fromCharCode(item);
        break;
      // 需要编码
      default:
        strList += '%' + item.toString(16).toUpperCase();
        break;
    }
  });
  return strList;
}
