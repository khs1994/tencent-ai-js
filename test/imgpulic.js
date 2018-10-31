'use strict';

const randomstring = require('randomstring');

// const process = require('process');

const {APP, fsReadSync} = require('./util');

const {ImgPublic} = require('../');

const imgPublic = new ImgPublic(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 计算机视觉-图片识别公共类 API 测试文件
 */
describe('image', () => {
  // 智能鉴黄
  it('porn', function () {
    return imgPublic.porn(fsReadSync(`${__dirname}/resource/face/wxc.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 暴恐图片识别
  it('terrorism', function () {
    return imgPublic.terrorism(fsReadSync(`${__dirname}/resource/vision/terrorism.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 场景识别
  it('scener', function () {
    return imgPublic.scener({
      image: fsReadSync(`${__dirname}/resource/vision/scener.jpg`),
      topk: 5
    }).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 物体识别
  it('object', function () {
    return imgPublic.objectr({
      image: fsReadSync(`${__dirname}/resource/vision/dog.jpg`),
      topk: 5
    }).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 图像标签识别
  it('tag', function () {
    return imgPublic.imagetag(fsReadSync(`${__dirname}/resource/vision/food.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 车辆识别
  it('identify_car', function () {
    return imgPublic.imgidentify(fsReadSync(`${__dirname}/resource/vision/vehicle.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 花草
  it('identify', function () {
    return imgPublic.imgidentify(
      fsReadSync(`${__dirname}/resource/vision/flower.jpg`),
      2
    ).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 看图说话
  it('imgtotext', function () {
    return imgPublic.imgtotext(
      fsReadSync(`${__dirname}/resource/vision/food.jpg`),
      randomstring.generate({
        length: 16,
        capitalization: 'uppercase'
      })
    ).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 模糊图片检测
  it('fuzzy', function () {
    return imgPublic.imagefuzzy(fsReadSync(`${__dirname}/resource/vision/food.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 美食图片识别
  it('food', function () {
    return imgPublic.imagefood(fsReadSync(`${__dirname}/resource/vision/food.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });
});
