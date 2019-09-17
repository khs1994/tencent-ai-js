// 编码为 gbk 并进行 urlencode
import gbk from './gbk.js/index';
import { urlencodeReplace } from './urlencode';

export function textToGBK(text: string): string {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  // let str = iconv.encode(text, 'gbk');
  let str = gbk.encode(text);

  // GBK 编码的腾讯共有 2 个字符，每个字符由 2 个字节组成，
  // 十六进制分别为：腾 => 0xCCDA、讯 => 0xD1B6，那么腾讯的URL编码是：%CC%DA%D1%B6。

  // 实现 urlencode
  return urlencodeReplace(str);
}
