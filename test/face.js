'use strict';

const {APP, fsReadSync} = require('./util');

const {Face} = require('../');

const face = new Face(APP.appkey, APP.appid);

/**
 * 面部识别API 测试类
 */

describe('face', () => {

  // 人脸分析
  it('detectface', () => {
    return face.detectface(
      fsReadSync(`${__dirname}/resource/wxc.jpg`),
      0
    ).then((res) => {
      if (res.ret === 0) {
        console.log('正常人脸分析', JSON.stringify(res));
      } else {
        console.log('ERROR正常人脸分析', JSON.stringify(res));
      }
    }, (e) => {
      console.log('正常人脸分析', JSON.stringify(e));
    });
  });

  // 人脸分析 大人脸
  it('detectface_big', function () {
    return face.detectface(
      fsReadSync(`${__dirname}/file/face.jpg`),
      1
    ).then((res) => {
      if (res.ret === 0) {
        console.log('大脸模式人脸分析', JSON.stringify(res));
      } else {
        console.log('ERROR大脸模式人脸分析', JSON.stringify(res));
      }
    }, (e) => {
      console.log('大脸模式人脸分析', JSON.stringify(e));
    });
  });

  // 多人脸检测
  it('detectmultiface', function () {
    return face.detectmultiface(fsReadSync(`${__dirname}/file/detectmultiface.jpg`)).then((res) => {
      if (res.ret === 0) {
        console.log('多人脸检测', JSON.stringify(res));
      } else {
        console.log('ERROR多人脸检测', JSON.stringify(res));
      }
    }, (e) => {
      console.log('多人脸检测', JSON.stringify(e));
    });
  });

  // 人脸对比
  it('facecompare', function () {
    return face.facecompare(
      fsReadSync(`${__dirname}/file/facecompare_a.jpg`),
      fsReadSync(`${__dirname}/file/facecompare_b.jpg`)
    ).then((res) => {
      if (res.ret === 0) {
        console.log('人脸对比', JSON.stringify(res));
      } else {
        console.log('ERROR人脸对比', JSON.stringify(res));
      }
    }, (e) => {
      console.log('人脸对比', JSON.stringify(e));
    });
  });

  // 五官定位
  it('faceshape ', function () {
    return face.faceshape(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      0
    ).then((res) => {
      if (res.ret === 0) {
        console.log('正常五官定位', JSON.stringify(res));
      } else {
        console.log('ERROR正常五官定位', JSON.stringify(res));
      }
    }, (e) => {
      console.log('正常五官定位', JSON.stringify(e));
    });
  });

  // 五官定位 大脸
  it('faceshape_big', function () {
    return face.faceshape(
      fsReadSync(`${__dirname}/file/face.jpg`),
      1
    ).then((res) => {
      if (res.ret === 0) {
        console.log('大脸模式五官定位', JSON.stringify(res));
      } else {
        console.log('ERROR大脸模式五官定位', JSON.stringify(res));
      }
    }, (e) => {
      console.log('大脸模式五官定位', JSON.stringify(e));
    });
  });
});
