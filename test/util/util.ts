import md5 from '../../src/util/md5';
import node_md5 from './node_md5';
import * as assert from 'assert';
import { urlencode, textToGBK } from '../../src/util/util';
import * as querystring from 'querystring'; // node 内置
import * as qs from 'qs';
import textToGBKByIconv from './textToGBKByIconv';
import * as iconv from 'iconv-lite';
import gbk from '../../src/util/gbk.js/index';

let testString = '"https://你好!@#$%^&*=+()_-. 1A;?,#：\'~\\';

describe('md5', () => {
  it('md5', () => {
    assert.strictEqual(md5('1'), node_md5('1'));
  });

  it('urlencode', () => {
    assert.strictEqual(urlencode('你好'), querystring.escape('你好'));
  });

  it('gbk', () => {
    console.log('iconv.encode ' + iconv.encode(testString, 'gbk'));
    console.log('gbk.encode   ' + gbk.encode(testString));

    // assert.strictEqual(iconv.encode(testString, 'gbk'), gbk.encode(testString));

    console.log('textToGBKByIconv           ' + textToGBKByIconv(testString));
    console.log('textToGBK                  ' + textToGBK(testString));

    assert.strictEqual(textToGBKByIconv(testString), textToGBK(testString));

    console.log('gbk.URI.encodeURI          ' + gbk.URI.encodeURI(testString));
    console.log(
      'gbk.URI.encodeURIComponent ' + gbk.URI.encodeURIComponent(testString),
    );
  });

  it('urlencode_', () => {
    // 所有方法都不会对 ASCII 字母和数字进行编码

    // 不替换以下符号
    // ASCII 标点符号 - _ . ! ~ * ' ( )
    console.log('querystring.escape ' + querystring.escape(testString));

    // 不替换以下符号 _ - . ~
    // 空格替换为 %20
    console.log('qs.stringify       ' + qs.stringify({ testString }));

    // 不替换以下符号
    // ASCII 标点符号 - _ . ! ~ * ' ( )
    // ; , / ? : @ & = + $
    // #
    // 空格替换为 %20
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
    console.log('encodeURI          ' + encodeURI(testString));

    // 不替换以下符号
    // ASCII 标点符号 - _ . ! ~ * ' ( )
    // 其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号）都会被替换
    // 都是由一个或多个十六进制的转义序列替换的
    // 空格替换为 %20
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    console.log('encodeURIComponent ' + encodeURIComponent(testString));

    // 本项目使用 urlencode 方法(PHP urlencode)
    // 不替换以下符号 - _ .
    // 特殊编码的符号 空格 替换为 +
    // https://www.php.net/manual/en/function.urlencode.php
    console.log('urlencode          ' + urlencode(testString));

    assert.strictEqual(
      querystring.escape(testString),
      encodeURIComponent(testString),
    );

    // assert.strictEqual(
    //   encodeURIComponent(testString).replace(/[!'()*]/g, function(c) {
    //     return '%' + c.charCodeAt(0).toString(16);
    //   }),
    //   urlencode(testString),
    // );
  });
});
