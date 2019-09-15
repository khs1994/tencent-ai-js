// const randomstring = require('randomstring');

// const process = require('process');

import { APP, fsReadSync } from './util';

import { Image } from '../src/TencentAI';

const imgPublic = new Image(APP.appkey, APP.appid);

import * as assert from 'assert';

/**
 * 计算机视觉-图片识别公共类 API 测试文件
 */
describe('image', function() {
  this.retries(4);
  // 智能鉴黄
  it('porn', async function() {
    let r = await imgPublic.porn(
      fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
    );

    assert.strictEqual(r.ret, 0);
  });

  it.skip('porn_url', async function() {
    let r = await imgPublic.porn(
      '',
      'https://raw.githubusercontent.com/khs1994-php/resource/master/face/peterye1.jpg',
    );

    assert.strictEqual(r.ret, 0);
  });

  // 暴恐图片识别
  it('terrorism', function() {
    return imgPublic
      .terrorism(fsReadSync(`${__dirname}/resource/vision/terrorism.jpg`))
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  it.skip('terrorism_url', function() {
    return imgPublic
      .terrorism(
        '',
        'https://yyb.gtimg.com/ai/assets/ai-demo/large/terror-14-lg.jpg',
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

  // 场景识别
  it.skip('scener', function() {
    return imgPublic
      .scener(fsReadSync(`${__dirname}/resource/vision/scener.jpg`), 1)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 物体识别
  it.skip('object', function() {
    return imgPublic
      .objectr(fsReadSync(`${__dirname}/resource/vision/dog.jpg`), 1, 5)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 图像标签识别
  it('tag', function() {
    return imgPublic
      .tag(fsReadSync(`${__dirname}/resource/vision/food.jpg`))
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 车辆识别
  it('identify_car', function() {
    return imgPublic
      .identify(fsReadSync(`${__dirname}/resource/vision/vehicle.jpg`))
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 花草
  it('identify', function() {
    return imgPublic
      .identify(fsReadSync(`${__dirname}/resource/vision/flower.jpg`), 2)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 看图说话
  it('imgtotext', function() {
    return imgPublic
      .toText(
        fsReadSync(`${__dirname}/resource/vision/food.jpg`),
        // randomstring.generate({
        //   length: 16,
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

  // 模糊图片检测
  it('fuzzy', function() {
    return imgPublic
      .fuzzy(fsReadSync(`${__dirname}/resource/vision/food.jpg`))
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 美食图片识别
  it('food', function() {
    return imgPublic
      .food(fsReadSync(`${__dirname}/resource/vision/food.jpg`))
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
