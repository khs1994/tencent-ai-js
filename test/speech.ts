// const randomstring = require('randomstring');

// const process = require('process');

// const fs = require('fs');

import { APP, fsReadSync } from './util';

import { Speech } from '../src/TencentAI';

const speech = new Speech(APP.appkey, APP.appid);

import * as assert from 'assert';

/**
 * 智能语音 测试文件
 * 语音识别-流式版（AI Lab）、语音识别-流式版(WeChat AI)、长语音识别
 */
describe('speech', function() {
  this.retries(5);
  // 音频鉴黄
  it('evilaudio', async () => {
    let r = await speech.evilaudio(
      // randomstring.generate(10),
      'test',
      'https://gitee.com/khs1994-php/resource/raw/master/audio/1.wav',
    );

    assert.strictEqual(r.ret, 0);
  });

  // 音频关键词搜索
  it('detectkeyword', async () => {
    let r = await speech.detectkeyword(
      'https://127.0.0.1',
      '商业',
      2,
      fsReadSync(__dirname + '/resource/audio/15s.wav'),
    );

    assert.strictEqual(r.ret, 0);
  });

  // 音频关键词搜索 url
  it('detectkeyword_url', done => {
    (async () => {
      try {
        let r = await speech.detectkeyword(
          'https://127.0.0.1',
          '商业',
          2,
          '',
          'https://gitee.com/khs1994-php/resource/raw/master/audio/1.wav',
        );

        assert.strictEqual(r.ret, 0);
        done();
      } catch (err) {
        assert.strictEqual(err.ret, 0);
        done();
      }
    })();
  });

  // 语音合成（AI Lab）
  it('tts', function() {
    return speech
      .tts('一个人心理成熟的具体表现都有哪些', 1, 2, 10, 100, 0, 58)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 语音合成
  it('tta', () => {
    return speech.tta('一个人心理成熟的具体表现都有哪些', 0, 0).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 语音识别
  it('asr', function() {
    return speech
      .asr(fsReadSync(`${__dirname}/resource/audio/1.wav`), 2, 16000)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 长语音识别
  it('wxasrlong', () => {
    return speech
      .wxasrlong(
        2,
        'https://127.0.0.1',
        fsReadSync(__dirname + '/resource/audio/15s.wav'),
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
});
