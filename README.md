# TencentAI Node.js SDK

[![npm](https://img.shields.io/npm/v/tencent-ai.svg)](https://www.npmjs.com/package/tencent-ai) [![Build Status](https://travis-ci.com/khs1994-php/tencent-ai-node.svg?branch=master)](https://travis-ci.com/khs1994-php/tencent-ai-node) [![codecov](https://codecov.io/gh/khs1994-php/tencent-ai-node/branch/master/graph/badge.svg)](https://codecov.io/gh/khs1994-php/tencent-ai-node) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**This repo fork from https://github.com/w89612b/qqai-api-sdk**

* [Tencent AI News](https://github.com/khs1994-php/tencent-ai-news)

## 微信订阅号

<p align="center">
<img width="200" src="https://user-images.githubusercontent.com/16733187/46847944-84a96b80-ce19-11e8-9f0c-ec84b2ac463e.jpg">
</p>

<p align="center"><strong>关注项目作者微信订阅号，接收项目最新动态</strong></p>

## Installation

```bash
$ npm install tencent-ai
```

## Usage

```js
const { Translate } = require('tencent-ai');

const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'your appkey',
  appid: 'your appid'
};

const translate = new Translate(APP.appkey, APP.appid);

// 文本翻译（AI Lab）
translate.texttrans({text: '你好'}).then((res)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(res));
}, (e)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(e));
})
```

## CI/CD

* https://github.com/codecov/codecov-node

## Tests

set system env first

```bash
NODE_TENCENT_AI_APP_KEY=

NODE_TENCENT_AI_APP_ID=
```
