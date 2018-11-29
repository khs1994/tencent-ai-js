import md5 from '../../src/util/md5';
import * as assert from 'assert';

describe('md5', () => {
  it('md5', () => {
    assert.strictEqual(md5('1'), 'c4ca4238a0b923820dcc509a6f75849b');
  });
});
