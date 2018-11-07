'use strict';

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
  it('texttrans', () => {
    return translate.texttrans({ text: 'Hello 世界', type: 0 }).then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 文本翻译（翻译君）
  it('texttranslate', function() {
    return translate.texttranslate({ text: '你好', target: 'en' }).then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 图片翻译
  it('imagetranslate', function() {
    return translate
      .imagetranslate({
        image: fsReadSync(`${__dirname}/resource/translate/english.jpg`),
        session_id: randomstring.generate({
          length: 16,
          capitalization: 'uppercase',
        }),
        scene: 'doc',
        source: 'en',
        target: 'zh',
      })
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 语音翻译
  it('speechtranslate', function() {
    let speech_chunk = fsReadSync(`${__dirname}/resource/translate/t.pcm`);

    return translate
      .speechtranslate({
        speech_chunk,
        session_id: randomstring.generate({
          length: 16,
          capitalization: 'uppercase',
        }),
        format: 6,
      })
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 语种识别
  it('textdetect', function() {
    return translate.textdetect({ text: '你好' }).then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });
});
