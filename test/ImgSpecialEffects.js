'use strict';

const {APP, fsReadSync} = require('./util');

const randomString = require('randomstring');

const fs = require('fs');

// const process = require('process');

const {ImgSpecialEffects} = require('../');

const imgSpecialEffects = new ImgSpecialEffects(APP.appkey, APP.appid);

/**
 * 计算机视觉-图片特效类 API 测试文件
 */

describe('image', () => {
  // 人脸美妆
  it('facecosmetic', () => {
    imgSpecialEffects.facecosmetic(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      22
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/facecosmetic_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('人脸美妆', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR人脸美妆', JSON.stringify(res));
      }
    }, (e) => {
      console.log('人脸美妆', JSON.stringify(e));
    });
  });

  // 人脸变妆

  it('should ', function () {
    imgSpecialEffects.facedecoration(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      22
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/facedecoration_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('人脸变妆', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR人脸变妆', JSON.stringify(res));
      }
    }, (e) => {
      console.log('人脸变妆', JSON.stringify(e));
    });
  });
  // 天天P图

  it('should ', function () {
    imgSpecialEffects.ptuimgfilter(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      5
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/ptuimgfilter_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('天天P图', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR天天P图', JSON.stringify(res));
      }
    }, (e) => {
      console.log('天天P图', JSON.stringify(e));
    });
  });

  // 图片滤镜 AI Lab

  it('should ', function () {
    imgSpecialEffects.visionimgfilter(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      26,
      randomString.generate({
        length: 16,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
      })
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/visionimgfilter_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('图片滤镜', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR图片滤镜', JSON.stringify(res));
      }
    }, (e) => {
      console.log('图片滤镜', JSON.stringify(e));
    });
  });

  // 人脸融合

  it('should ', function () {
    imgSpecialEffects.facemerge(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      26
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/facemerge_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('人脸融合', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR人脸融合', JSON.stringify(res));
      }
    }, (e) => {
      console.log('人脸融合', JSON.stringify(e));
    });
  });

  // 大头贴

  it('should ', function () {
    imgSpecialEffects.facesticker(
      fsReadSync(`${__dirname}/file/人脸美妆.jpg`),
      26
    ).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/facesticker_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        console.log('大头贴', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR大头贴', JSON.stringify(res));
      }
    }, (e) => {
      console.log('大头贴', JSON.stringify(e));
    });
  });

  // 颜龄检测

  it('should ', function () {
    imgSpecialEffects.faceage(fsReadSync(`${__dirname}/file/人脸美妆.jpg`)).then((res) => {
      if (res.ret === 0) {
        let newtiem = Date.now();
        let dir = `${__dirname}/outFile/faceage_${newtiem}.jpg`;
        fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
        res.data.image = '';
        console.log('颜龄检测', `存放地址为: ${dir}`);
      } else {
        console.log('ERROR颜龄检测', JSON.stringify(res));
      }
    }, (e) => {
      console.log('颜龄检测', JSON.stringify(e));
    });
  });
});
