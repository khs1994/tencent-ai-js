import { APP, fsReadSync } from './util';

// const randomString = require('randomstring');

// const fs = require('fs');

// const process = require('process');

import { ImageSpecialEffects } from '../src/TencentAI';

const imgSpecialEffects = new ImageSpecialEffects(APP.appkey, APP.appid);

import * as assert from 'assert';

/**
 * 计算机视觉-图片特效类 API 测试文件
 */
describe('image', function() {
  this.retries(4);
  // 人脸美妆
  it('facecosmetic', () => {
    return imgSpecialEffects
      .facecosmetic(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 22)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 人脸变妆
  it('decoration', function() {
    return imgSpecialEffects
      .facedecoration(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 22)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 天天P图
  it('ptuimgfilter', function() {
    return imgSpecialEffects
      .ptuimgfilter(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 5)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 图片滤镜 AI Lab
  it('visionimgfilter', function() {
    return imgSpecialEffects
      .visionimgfilter(
        fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
        26,
        // randomString.generate({
        //   length: 16,
        //   charset: 'alphanumeric',
        //   capitalization: 'uppercase',
        // }),
        'test',
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

  // 人脸融合
  it.skip('facemerge', function() {
    return imgSpecialEffects
      .facemerge(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 1)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 大头贴
  it('facesticker', function() {
    return imgSpecialEffects
      .facesticker(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 26)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 颜龄检测
  it('faceage', function() {
    return imgSpecialEffects
      .faceage(fsReadSync(`${__dirname}/resource/face/wxc.jpg`))
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
