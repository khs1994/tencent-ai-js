'use strict';

const { APP, fsReadSync } = require('./util');

const { Face } = require('../');

const face = new Face(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 面部识别API 测试类
 */
describe('face', () => {
  // 人脸分析
  it('detectface', () => {
    return face
      .detectface(fsReadSync(`${__dirname}/resource/face/wxc.jpg`), 0)
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 人脸分析 大脸
  it('detectface_big', function() {
    return face
      .detectface(fsReadSync(`${__dirname}/resource/face/wxc2.jpg`), 1)
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 多人脸检测
  it('detectmultiface', function() {
    return face
      .detectmultiface(fsReadSync(`${__dirname}/resource/face/peterye2.jpg`))
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 人脸对比
  it('facecompare', function() {
    return face
      .facecompare(
        fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
        fsReadSync(`${__dirname}/resource/face/wxc2.jpg`)
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

  // 五官定位
  it('faceshape', function() {
    return face
      .faceshape(fsReadSync(`${__dirname}/resource/face/wxc3.jpg`), 0)
      .then(
        res => {
          assert.equal(res.ret, 0);
        },
        e => {
          assert.equal(e.ret, 0);
        }
      );
  });

  // 五官定位 大脸
  it('faceshape_big', function() {
    return face
      .faceshape(fsReadSync(`${__dirname}/resource/face/wxc3.jpg`), 1)
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
