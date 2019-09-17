import * as iconv from 'iconv-lite';
// import gbk = require('gbk.js');

// 编码为 gbk 并进行 urlencode
export default function(text: string): string {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  let str = iconv.encode(text, 'gbk');
  // let str = gbk.encode(text);
  let strList: string = '';
  str.map((item: number): any => {
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
      case // item === 42 || // *
      item === 45 || // -
      item === 46 || // .
      item === 95 || // _
      (item >= 48 && item <= 57) || // 0-9
      (item >= 65 && item <= 90) || // A-Z
        (item >= 97 && item <= 122): // a-z
        strList += String.fromCharCode(item);
        break;
      // 需要编码
      default:
        // 10 进制转 16 进制
        strList += '%' + item.toString(16).toUpperCase();
        break;
    }
  });
  return strList;
}
