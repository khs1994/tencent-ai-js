'use strict';

const randomstring = require('randomstring');

const process = require('process');

const {APP, fsReadSync} = require('./util');

const {ImgPublic} = require('../');

const imgPublic = new ImgPublic(APP.appkey, APP.appid);

/**
 * 计算机视觉-图片识别公共类 API 测试文件
 */

describe('', () => {
  // 智能鉴黄
  it('should ', function () {
    imgPublic.porn(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\1.jpg` : `${__dirname}/file/1.jpg`)).then((res) => {
      res.data.tag_list.map(item => {
        item.tag_name = resPornKey[item.tag_name];
      });
      console.log('智能鉴黄', JSON.stringify(res));
    }, (e) => {
      console.log('智能鉴黄', JSON.stringify(e));
    });
  });

  // 暴恐图片识别

  it('should ', function () {
    imgPublic.terrorism(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\火灾.jpg` : `${__dirname}/file/火灾.jpg`)).then((res) => {
      res.data.tag_list.map(item => {
        item.tag_name = resTerrorismKey[item.tag_name];
      });
      console.log('暴恐图片识别', JSON.stringify(res));
    }, (e) => {
      console.log('暴恐图片识别', JSON.stringify(e));
    });
  });

  // 场景识别

  it('should ', function () {
    imgPublic.scener({
      image: fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\scener.jpg` : `${__dirname}/file/scener.jpg`),
      topk: 5
    }).then((res) => {
      res.data.scene_list.map(item => {
        item.label_id = resSceneKey[item.label_id];
      });
      console.log('场景识别', JSON.stringify(res));
    }, (e) => {
      console.log('场景识别', JSON.stringify(e));
    });
  });

  // 物体识别

  it('should ', function () {
    imgPublic.objectr({
      image: fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\objectr.jpg` : `${__dirname}/file/objectr.jpg`),
      topk: 5
    }).then((res) => {
      res.data.object_list.map(item => {
        item.label_id = resObjectKey[item.label_id];
      });
      console.log('物体识别', JSON.stringify(res));
    }, (e) => {
      console.log('物体识别', JSON.stringify(e));
    });
  });

  // 图像标签识别

  it('should ', function () {
    imgPublic.imagetag(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\imgtag.jpg` : `${__dirname}/file/imgtag.jpg`)).then((res) => {
      console.log('图像标签识别', JSON.stringify(res));
    }, (e) => {
      console.log('图像标签识别', JSON.stringify(e));
    });
  });

  // 车辆识别

  it('should ', function () {
    imgPublic.imgidentify(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\che.jpg` : `${__dirname}/file/che.jpg`)).then((res) => {
      console.log('车辆识别', JSON.stringify(res));
    }, (e) => {
      console.log('车辆识别', JSON.stringify(e));
    });
  });

  // 花草

  it('should ', function () {
    imgPublic.imgidentify(
      fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\hua.jpg` : `${__dirname}/file/hua.jpg`),
      2
    ).then((res) => {
      console.log('花草', JSON.stringify(res));
    }, (e) => {
      console.log('花草', JSON.stringify(e));
    });
  });

  // 看图说话

  it('should ', function () {
    imgPublic.imgtotext(
      fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\1jpg.jpg` : `${__dirname}/file/1jpg.jpg`),
      randomstring.generate({
        length: 16,
        capitalization: 'uppercase'
      })
    ).then((res) => {
      console.log('看图说话', JSON.stringify(res));
    }, (e) => {
      console.log('看图说话', JSON.stringify(e));
    });
  });
  // 模糊图片检测
  it('should ', function () {

    imgPublic.imagefuzzy(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\fuzzy.jpg` : `${__dirname}/file/fuzzy.jpg`)).then((res) => {
      console.log('模糊图片检测', JSON.stringify(res));
    }, (e) => {
      console.log('模糊图片检测', JSON.stringify(e));
    });
  });
  // 美食图片识别
  it('should ', function () {
    imgPublic.imagefood(fsReadSync(process.platform.match(/^win/) ? `${__dirname}\\file\\food.jpg` : `${__dirname}/file/food.jpg`)).then((res) => {
      console.log('美食图片识别', JSON.stringify(res));
    }, (e) => {
      console.log('美食图片识别', JSON.stringify(e));
    });
  });
});
