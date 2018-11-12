'use strict';

const md5 = require('../../src/util/md5').hex_md5;
const assert = require('assert');

describe('md5', () => {
  it('md5', () => {
    assert.strictEqual(md5('1'), 'c4ca4238a0b923820dcc509a6f75849b');
  });
});
