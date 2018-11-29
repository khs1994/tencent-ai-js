const randomstring = require('randomstring');

// const process = require('process');

// const fs = require('fs');

const { APP, fsReadSync } = require('./util');

const { Speech } = require('../');

const speech = new Speech(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 智能语音 测试文件
 * 语音识别-流式版（AI Lab）、语音识别-流式版(WeChat AI)、长语音识别
 */
describe('speech', function() {
  this.retries(4);
  // 音频鉴黄
  it('evilaudio', async () => {
    let r = await speech.evilaudio(
      randomstring.generate(10),
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
    return speech.tts('你好中国', 1, 2, 10, 100, 0, 58).then(
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
    return speech.tta('我的中国心', 0, 0).then(
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
