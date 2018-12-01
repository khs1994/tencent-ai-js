// const randomstring = require('randomstring');

const assert = require('assert');

import { APP } from './util';

import { NLP, TencentAIError } from '../src/TencentAI';

const gbk = require('gbk.js');

const NLPTest = new NLP(APP.appkey, APP.appid);

describe('index', () => {
  it('index', () => {
    assert.throws(() => new NLP('', ''), TencentAIError);
  });
});

/**
 * 自然语言处理-基本类 API 测试文件
 */
describe('baseLanguage', function() {
  this.retries(4);
  // 基本文本分析 分词
  it('wordseg', async () => {
    let r = await NLPTest.wordseg('中国 人啊，a c !  hello word');

    assert.strictEqual(r.ret, 0);
  });

  // 词性定义
  it('wordpos', async () => {
    let r = await NLPTest.wordpos('腾讯人工智能');

    assert.strictEqual(r.ret, 0);
  });

  // 专有名词识别
  it('wordner', async () => {
    let r = await NLPTest.wordner('最近张学友在深圳开了一场演唱会');

    r.data.ner_tokens.map(item => {
      assert.ok(item.types[0]);
    });
  });

  // 同义词识别
  it('wordsyn', async () => {
    let r = await NLPTest.wordsyn('今天的天气怎么样');

    assert.strictEqual(r.ret, 0);
  });

  // 语义解析
  it('wordcom', async () => {
    let r = await NLPTest.wordcom('今天深圳的天气怎么样？明天呢');

    assert.strictEqual(r.ret, 0);
  });

  // 情感分析识别
  it('textpolar', async function() {
    let r = await NLPTest.textpolar('今天的天气不错呀!()english');

    assert.strictEqual(r.ret, 0);
  });

  // 基础闲聊
  it('textchat', async function() {
    let r = await NLPTest.textchat(
      '今天的天气不错呀?!()',
      // randomstring.generate({
      //   length: 16,
      //   capitalization: 'uppercase',
      // }),
      'test',
    );

    assert.strictEqual(r.ret, 0);
  });
});
