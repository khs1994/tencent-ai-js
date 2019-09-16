// 编码为 gbk 并进行 urlencode
import gbk from './gbk.js/index';

export function textToGBK(text: string): string {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  // let str = iconv.encode(text, 'gbk');
  let str = gbk.encode(text);

  // GBK 编码的腾讯共有 2 个字符，每个字符由 2 个字节组成，
  // 十六进制分别为：腾 => 0xCCDA、讯 => 0xD1B6，那么腾讯的URL编码是：%CC%DA%D1%B6。

  // 实现 urlencode
  let strList: string = '';
  str.map((item: number): void => {
    switch (true) {
      // ascii 0
      case item === 0:
        strList += '%00';
        break;
      // 空格转为 + 号
      case item === 32:
        strList += '+';
        break;
      // 原样输出
      case // item === 42 ||
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
        // 10 进制转 16 进制
        strList += '%' + item.toString(16).toUpperCase();
        break;
    }
  });
  return strList;
}
