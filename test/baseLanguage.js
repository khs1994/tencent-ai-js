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
  it('wordseg', () => {
    return baseLanguage.wordseg('中国 人啊，a c ! hello word').then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 词性定义
  it('wordpos', () => {
    return baseLanguage.wordpos('腾讯人工智能').then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 专有名词识别
  it('wordner', () => {
    return baseLanguage.wordner('最近张学友在深圳开了一场演唱会').then(
      res => {
        res.data.ner_tokens.map(item => {
          assert.ok(item.types[0]);
        });
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 同义词识别
  it('wordsyn', () => {
    return baseLanguage.wordsyn('今天的天气怎么样').then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 语义解析
  it('wordcom', () => {
    return baseLanguage.wordcom('Despacito歌词搜索').then(
      res => {
        assert(res.ret, 0);
      },
      e => {
        assert(e.ret, 0);
      }
    );
  });

  // 情感分析识别
  it('textpolar', function() {
    return baseLanguage.textpolar('今天的天气不错呀').then(
      res => {
        assert.equal(res.ret, 0);
      },
      e => {
        assert.equal(e.ret, 0);
      }
    );
  });

  // 基础闲聊
  it('textchat', function() {
    return baseLanguage
      .textchat({
        question: '今天的天气不错呀',
        session: randomstring.generate({
          length: 16,
          capitalization: 'uppercase',
        }),
      })
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
