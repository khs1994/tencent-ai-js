'use strict';

// const randomstring = require('randomstring');

const process = require('process');

const {APP, fsReadSync} = require('./util');

const {OCR} = require('../');

const ocr = new OCR(APP.appkey, APP.appid);

/**
 * OCR API 测试文件
 */

describe('', () => {
  // 身份证OCR识别 人像面 正面
  it('idcard_z', function () {
    return ocr.idcardocr(fsReadSync(`${__dirname}/file/idcard0.jpg`)).then((res) => {
      res.data.frontimage = '';
      console.log('身份证OCR识别 人像面 正面', JSON.stringify(res));
    }, (e) => {
      console.log('身份证OCR识别 人像面 正面', JSON.stringify(e));
    });
  });

  // 身份证OCR识别 国徽面 反面

  it('idcard_f', function () {
    return ocr.idcardocr(fsReadSync(`${__dirname}/file/idcard11.jpg`), 1).then((res) => {
      res.data.backimage = '';
      console.log('身份证OCR识别 国徽面 反面', JSON.stringify(res));
    }, (e) => {
      console.log('身份证OCR识别 国徽面 反面', JSON.stringify(e));
    });
  });

  // 名片OCR识别

  it('bcocr', function () {
    return ocr.bcocr(fsReadSync(`${__dirname}/file/名片一.jpg`)).then((res) => {
      console.log('名片OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('名片OCR识别', JSON.stringify(e));
    });
  });

  // 驾驶证OCR识别

  it('driverlicenseocr', () => {
    return ocr.driverlicenseocr(fsReadSync(`${__dirname}/file/驾驶证2.jpg`)).then((res) => {
      console.log('驾驶证OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('驾驶证OCR识别', JSON.stringify(e));
    });
  });

  // 行驶证OCR识别

  it('driverlicenseocr', function () {
    return ocr.driverlicenseocr(fsReadSync(`${__dirname}/file/行驶证1.jpg`), 0).then((res) => {
      console.log('行驶证OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('行驶证OCR识别', JSON.stringify(e));
    });
  });

  // 营业执照OCR识别

  it('bizlicenseocr', () => {
    return ocr.bizlicenseocr(fsReadSync(`${__dirname}/file/yyzz.jpg`)).then((res) => {
      console.log('营业执照OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('营业执照OCR识别', JSON.stringify(e));
    });
  });

  // 银行卡OCR识别
  it('creditcardocr', () => {
    return ocr.creditcardocr(fsReadSync(`${__dirname}/file/image银行卡1.jpg`)).then((res) => {
      console.log('银行卡OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('银行卡OCR识别', JSON.stringify(e));
    });
  });

  // 通用OCR识别
  it('generalocr', function () {
    return ocr.generalocr(fsReadSync(`${__dirname}/file/1369620356421.jpg`)).then((res) => {
      console.log('通用OCR识别', JSON.stringify(res));
    }, (e) => {
      console.log('通用OCR识别', JSON.stringify(e));
    });
  });

  // URL车牌识别
  it('plateocr_url', function () {
    return ocr.plateocr('https://yyb.gtimg.com/ai/assets/ai-demo/large/plate-1-lg.jpg').then((res) => {
      console.log('URL车牌识别', JSON.stringify(res));
    }, (e) => {
      console.log('URL车牌识别', JSON.stringify(e));
    });
  });

  // 文件车牌识别
  it('plateocr', function () {
    return ocr.plateocr(fsReadSync((`${__dirname}/file/`) + 'plateocr4.jpg')).then((res) => {
      console.log('文件车牌识别', JSON.stringify(res));
    }, (e) => {
      console.log('文件车牌识别', JSON.stringify(e));
    });
  });

  // 手写体OCR
  it('handwritingocr_url', function () {
    return ocr.handwritingocr('https://thumbs.dreamstime.com/z/%E6%B1%89%E8%AF%AD%E6%89%8B%E5%86%99-36694605.jpg').then((res) => {
      console.log('手写体OCR', JSON.stringify(res));
    }, (e) => {
      console.log('手写体OCR', JSON.stringify(e));
    });
  });

  // 手写体OCR
  it('handwritingocr', function () {
    return ocr.handwritingocr(fsReadSync((process.platform.match(/^win/) ? `${__dirname}\\file\\` : `${__dirname}/file/`) + 'handwritingocr.jpg')).then((res) => {
      console.log('手写体OCR', JSON.stringify(res));
    }, (e) => {
      console.log('手写体OCR', JSON.stringify(e));
    });
  });
});
