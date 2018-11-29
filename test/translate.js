const randomstring = require('randomstring');

// const process = require('process');

const { APP, fsReadSync } = require('./util');

const { Translate } = require('../');

const translate = new Translate(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 自然语言处理-翻译类 测试文件
 */
describe('translate', function() {
  this.retries(4);
  // 文本翻译（AI Lab）
  it('texttranslate', () => {
    return translate.texttrans('Hello 世界', 0).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 文本翻译（翻译君）
  it('texttranslate', function() {
    let text = '你好';
    // {text: '你好', target: 'en'}
    return translate.texttranslate(text, 'zh', 'en').then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 图片翻译
  it('imagetranslate', function() {
    return translate
      .imagetranslate(
        fsReadSync(`${__dirname}/resource/translate/english.jpg`),
        randomstring.generate({
          length: 16,
          capitalization: 'uppercase',
        }),
        'doc',
        'en',
        'zh',
      )
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 语音翻译
  it('speechtranslate', function() {
    let speech_chunk = fsReadSync(`${__dirname}/resource/translate/t.pcm`);

    return translate
      .speechtranslate(
        speech_chunk,
        randomstring.generate({
          length: 16,
          capitalization: 'uppercase',
        }),
        6,
      )
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 语种识别
  it('textdetect', function() {
    return translate.textdetect('你好').then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });
});
