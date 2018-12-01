import md5 from '../../src/util/md5';
import * as assert from 'assert';
import { urlencode } from '../../src/util/util';
import * as querystring from 'querystring';
import gbkEncodeByIconv from './gbkEncodeByIconv';

const iconv = require('iconv-lite');
const gbk = require('../../src/util/gbk.js');
import * as querystringNode from 'querystring';

describe('md5', () => {
  it('md5', () => {
    assert.strictEqual(md5('1'), 'c4ca4238a0b923820dcc509a6f75849b');
  });

  it('urlencode', () => {
    assert.strictEqual(urlencode('你好'), querystring.escape('你好'));
  });

  it('gbk', () => {
    console.log(iconv.encode('https://你好!@#$%^&*=+()_-. 1A', 'gbk'));
    console.log(gbk.encode('https://你好!@#$%^&*=+()_-. 1A'));

    console.log(gbkEncodeByIconv('https://你好!@#$%^&*=+()_-. 1A'));

    console.log(gbk.URI.encodeURI('https://你好!@#$%^&*=+()_-. 1A'));
    console.log(gbk.URI.encodeURIComponent('https://你好!@#$%^&*=+()_-. 1A'));

    console.log(gbk.encode('a', 'gbk'));
  });

  it('urlencode_', () => {
    // ! * () 没有被编码
    console.log(querystringNode.escape('https://你好!@#$%^&*=+()_-. 1A'));
    // 除了空格之外的其他字符都原封不动,只有空格被替换成了%20
    console.log(encodeURI('https://你好!@#$%^&*=+()_-. 1A'));
    // 保留编码的字符： -、.、_、数字、大小写字母（这些字符在URL编码结果后不会变化）
    // 特殊编码的字符：空格（这个字符在URL编码后变成+符号）
    console.log(encodeURIComponent('https://你好!@#$%^&*=+()_-. 1A'));
    // 本项目使用的 urlencode 方法
    console.log(urlencode('https://你好!@#$%^&*=+()_-. 1A'));
  });
});
