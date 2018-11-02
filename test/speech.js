'use strict';

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

describe('speech', () => {
  // 音频鉴黄
  it.skip('aaievilaudio', () => {
    return speech
      .aaievilaudio(
        randomstring.generate(10),
        'https://gitee.com/khs1994-php/resource/raw/master/audio/1.wav'
      )
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 语音合成（AI Lab）
  it('tts', function() {
    return speech
      .tts({
        text: '你好中国',
        speaker: 1,
        format: 2,
        volume: 10,
        speed: 100,
        aht: 0,
        apc: 58,
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

  // 语音合成
  it('tta', () => {
    return speech
      .tta({
        text: '我的中国心',
        model_type: 0,
        speed: 0,
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

  // 语音识别
  it('asr', function() {
    return speech
      .asr({
        speech: fsReadSync(`${__dirname}/resource/audio/1.wav`),
        rate: 16000,
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
});
