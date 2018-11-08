'use strict';

const { APP, fsReadSync } = require('./util');

const { Face } = require('../');

const face = new Face(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 面部识别API 测试类
 */
describe('face', function() {
  this.retries(4);
  // 人脸分析
  it('detectface', async () => {
    let r = await face.detectface(
      fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
      0,
    );

    assert.strictEqual(r.ret, 0);
  });

  // 人脸分析 大脸
  it('detectface_big', async function() {
    let r = await face.detectface(
      fsReadSync(`${__dirname}/resource/face/wxc2.jpg`),
      1,
    );

    assert.strictEqual(r.ret, 0);
  });

  // 多人脸检测
  it('detectmultiface', async function() {
    let r = await face.detectmultiface(
      fsReadSync(`${__dirname}/resource/face/peterye2.jpg`),
    );

    assert.strictEqual(r.ret, 0);
  });

  // 人脸对比
  it('facecompare', async function() {
    let r = await face.facecompare(
      fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
      fsReadSync(`${__dirname}/resource/face/wxc2.jpg`),
    );

    assert.strictEqual(r.ret, 0);
  });

  // 五官定位
  it('faceshape', async function() {
    let r = await face.faceshape(
      fsReadSync(`${__dirname}/resource/face/wxc3.jpg`),
      0,
    );

    assert.strictEqual(r.ret, 0);
  });

  // 五官定位 大脸
  it('faceshape_big', async function() {
    let r = await face.faceshape(
      fsReadSync(`${__dirname}/resource/face/wxc3.jpg`),
      1,
    );

    assert.strictEqual(r.ret, 0);
  });

  // 跨年龄人脸识别
  it('detectcrossageface', async function() {
    let r = await face.detectcrossageface(
      fsReadSync(__dirname + '/resource/face/peterye1.jpg'),
      fsReadSync(__dirname + '/resource/face/peterye2.jpg'),
    );
    assert.strictEqual(r.ret, 0);
  });
});
