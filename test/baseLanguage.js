'use strict';

const randomstring = require('randomstring');

// const iconv = require('iconv-lite');

const assert = require('assert');

const { APP } = require('./util');

const { BaseLanguage } = require('../');

const baseLanguage = new BaseLanguage(APP.appkey, APP.appid);

describe('index', () => {
  it('index', () => {
    assert.throws(() => new BaseLanguage('', ''), Error);
  });
});

/**
 * 自然语言处理-基本类 API 测试文件
 */
describe('baseLanguage', function() {
  this.retries(4);
  // 基本文本分析 分词
  it('wordseg', async () => {
    let r = await baseLanguage.wordseg('中国 人啊，a c ! hello word');

    assert.equal(r.ret, 0);
  });

  // 词性定义
  it('wordpos', async () => {
    let r = await baseLanguage.wordpos('腾讯人工智能');

    assert.equal(r.ret, 0);
  });

  // 专有名词识别
  it('wordner', async () => {
    let r = await baseLanguage.wordner('最近张学友在深圳开了一场演唱会');

    r.data.ner_tokens.map(item => {
      assert.ok(item.types[0]);
    });
  });

  // 同义词识别
  it('wordsyn', async () => {
    let r = await baseLanguage.wordsyn('今天的天气怎么样');

    assert.equal(r.ret, 0);
  });

  // 语义解析
  it('wordcom', async () => {
    let r = await baseLanguage.wordcom('今天深圳的天气怎么样？明天呢');

    assert.equal(r.ret, 0);
  });

  // 情感分析识别
  it('textpolar', async function() {
    let r = await baseLanguage.textpolar('今天的天气不错呀');

    assert.equal(r.ret, 0);
  });

  // 基础闲聊
  it('textchat', async function() {
    let r = await baseLanguage.textchat({
      question: '今天的天气不错呀',
      session: randomstring.generate({
        length: 16,
        capitalization: 'uppercase',
      }),
    });

    assert.equal(r.ret, 0);
  });
});
