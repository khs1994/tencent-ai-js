'use strict';

// const randomstring = require('randomstring');

// const process = require('process');

const {APP, fsReadSync} = require('./util');

const {OCR} = require('../');

const ocr = new OCR(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * OCR API 测试文件
 */
describe('ocr', () => {
  // 身份证OCR识别 人像面 正面
  it('idcard_z', function () {
    return ocr.idcardocr(fsReadSync(`${__dirname}/resource/ocr/idcardz.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 身份证OCR识别 国徽面 反面
  it.skip('idcard_f', function () {
    return ocr.idcardocr(fsReadSync(`${__dirname}/resource/ocr/idcardf.jpg`), 1).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 名片OCR识别
  it('bcocr', function () {
    return ocr.bcocr(fsReadSync(`${__dirname}/resource/ocr/businesscard.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 驾驶证OCR识别
  it('driverlicenseocr', () => {
    return ocr.driverlicenseocr(fsReadSync(`${__dirname}/resource/ocr/driver.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 行驶证OCR识别
  it('driverlicenseocr', function () {
    return ocr.driverlicenseocr(fsReadSync(`${__dirname}/resource/ocr/driving.jpg`), 0).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 营业执照OCR识别
  it('bizlicenseocr', () => {
    return ocr.bizlicenseocr(fsReadSync(`${__dirname}/resource/ocr/biz.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 银行卡OCR识别
  it('creditcardocr', () => {
    return ocr.creditcardocr(fsReadSync(`${__dirname}/resource/ocr/creditcard.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 通用OCR识别
  it('generalocr', function () {
    return ocr.generalocr(fsReadSync(`${__dirname}/resource/ocr/general.jpg`)).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 车牌识别 url
  it.skip('plateocr_url', function () {
    return ocr.plateocr('https://yyb.gtimg.com/ai/assets/ai-demo/large/plate-1-lg.jpg').then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 文件车牌识别
  it('plateocr', function () {
    return ocr.plateocr(fsReadSync((`${__dirname}/resource/ocr/`) + 'plate.jpg')).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 手写体OCR
  it('handwritingocr_url', function () {
    return ocr.handwritingocr('https://thumbs.dreamstime.com/z/%E6%B1%89%E8%AF%AD%E6%89%8B%E5%86%99-36694605.jpg').then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });

  // 手写体OCR
  it('handwritingocr', function () {
    return ocr.handwritingocr(fsReadSync((`${__dirname}/resource/ocr/`) + 'hd.jpg')).then((res) => {
      assert.equal(res.ret, 0);
    }, (e) => {
      assert.equal(e.ret, 0);
    });
  });
});
