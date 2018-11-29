import md5 from '../../src/util/md5';
import * as assert from 'assert';
import { urlencode } from '../../src/util/util';
import * as querystring from 'querystring';

const iconv = require('iconv-lite');
const gbk = require('gbk.js');

const textToGBK = text => {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  // let str = iconv.encode(text, 'gbk');
  let str = gbk.encode(text);
  let strList = '';
  str.map(item => {
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
};

describe('md5', () => {
  it('md5', () => {
    assert.strictEqual(md5('1'), 'c4ca4238a0b923820dcc509a6f75849b');
  });

  it('urlencode', () => {
    assert.strictEqual(urlencode('你好'), querystring.escape('你好'));
  });

  it('gbk', () => {
    console.log(iconv.encode('你好?', 'gbk'));
    console.log(gbk.encode('你好?'));

    console.log(textToGBK('你好?'));
    console.log(gbk.URI.encodeURI('你好?'));
  });
});
