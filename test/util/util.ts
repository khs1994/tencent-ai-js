import md5 from '../../src/util/md5';
import * as assert from 'assert';
import { urlencode } from '../../src/util/util';
import * as querystring from 'querystring';
import gbkEncodeByIconv from './gbkEncodeByIconv';

const iconv = require('iconv-lite');
const gbk = require('gbk.js');
import * as querystringNode from 'querystring';

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

    console.log(gbkEncodeByIconv('你好?'));
    console.log(gbk.URI.encodeURI('你好?'));
  });

  it('urlencode', () => {
    console.log(querystringNode.escape('你好?'));
    console.log(encodeURIComponent('你好?'));
  });
});
