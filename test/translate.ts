// const randomstring = require('randomstring');

// const process = require('process');

import { APP, fsReadSync } from './util';

import { Translate } from '../src/TencentAI';

const translate = new Translate(APP.appkey, APP.appid);

import * as assert from 'assert';

/**
 * 自然语言处理-翻译类 测试文件
 */
describe('translate', function() {
  this.retries(4);
  // 文本翻译（AI Lab）
  it('texttranslate', () => {
    return translate.textByAILab('Hello 世界', 0).then(
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
    return translate.text(text, 'zh', 'en').then(
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
      .image(
        fsReadSync(`${__dirname}/resource/translate/english.jpg`),
        // randomstring.generate({
        //   length: 16,
        //   capitalization: 'uppercase',
        // }),
        'test',
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
      .speech(
        speech_chunk,
        // randomstring.generate({
        //   length: 16,
        //   capitalization: 'uppercase',
        // }),
        'test',
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
    return translate.textDetect('你好').then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });
});
