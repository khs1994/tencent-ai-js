# TencentAI Node.js SDK

[![npm](https://img.shields.io/npm/v/@khs1994/tencent-ai.svg)](https://www.npmjs.com/package/@khs1994/tencent-ai) [![Build Status](https://travis-ci.com/khs1994-php/tencent-ai-node.svg?branch=master)](https://travis-ci.com/khs1994-php/tencent-ai-node) [![codecov](https://codecov.io/gh/khs1994-php/tencent-ai-node/branch/master/graph/badge.svg)](https://codecov.io/gh/khs1994-php/tencent-ai-node) [![install size](https://packagephobia.now.sh/badge?p=@khs1994/tencent-ai)](https://packagephobia.now.sh/result?p=@khs1994/tencent-ai) [![code style: prettier](https://badgen.now.sh/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

**This repo fork from https://github.com/w89612b/qqai-api-sdk**

- [Tencent AI News](https://github.com/khs1994-php/tencent-ai-news)

## 微信订阅号

<p align="center">
<img width="200" src="https://user-images.githubusercontent.com/16733187/46847944-84a96b80-ce19-11e8-9f0c-ec84b2ac463e.jpg">
</p>

<p align="center"><strong>关注项目作者微信订阅号，接收项目最新动态</strong></p>

## Installation

```bash
$ npm install @khs1994/tencent-ai
```

## Usage

```js
const { Translate } = require('@khs1994/tencent-ai');

const App = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'your-appkey', // process.env.NODE_TENCENT_AI_APP_KEY
  appid: 'your-appid', // process.env.NODE_TENCENT_AI_APP_ID
};

const translate = new Translate(App.appkey, App.appid);

// 文本翻译（AI Lab）
translate.texttrans({ text: '你好' }).then(
  res => {
    console.log(res);
  },
  e => {
    console.log(e);
  }
);

// Or Using async / await ES7

(async () => {
  try {
    let text = 'hello';
    let res = await translate.texttrans({ text });
    console.log(res);
    // error demo
    let tex = 'hello';
    res = await translate.texttrans({ tex });
  } catch (e) {
    console.log(e);
  }
})();
```

## CI/CD

[PCIT](https://github.com/khs1994-php/pcit) Node.js 示例项目

## Test

please set system env first

```bash
NODE_TENCENT_AI_APP_KEY=your-appkey

NODE_TENCENT_AI_APP_ID=your-appid
```

```bash
$ npm test
```
