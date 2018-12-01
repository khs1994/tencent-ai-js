# TencentAI Node.js SDK

[![npm](https://img.shields.io/npm/v/@khs1994/tencent-ai.svg)](https://www.npmjs.com/package/@khs1994/tencent-ai) [![Build Status](https://travis-ci.com/khs1994/tencent-ai-node.svg?branch=master)](https://travis-ci.com/khs1994/tencent-ai-node) [![codecov](https://codecov.io/gh/khs1994/tencent-ai-node/branch/master/graph/badge.svg)](https://codecov.io/gh/khs1994/tencent-ai-node) [![install size](https://packagephobia.now.sh/badge?p=@khs1994/tencent-ai)](https://packagephobia.now.sh/result?p=@khs1994/tencent-ai) [![code style: prettier](https://badgen.now.sh/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

**This repo fork from https://github.com/w89612b/qqai-api-sdk**

- [Tencent AI News](https://github.com/khs1994-php/tencent-ai-news)

## 微信订阅号

<p align="center">
<img width="200" src="https://user-images.githubusercontent.com/16733187/46847944-84a96b80-ce19-11e8-9f0c-ec84b2ac463e.jpg">
</p>

<p align="center"><strong>关注项目作者微信订阅号，接收项目最新动态</strong></p>

## Installation

```bash
$ npm i --save @khs1994/tencent-ai
```

## Usage

- 可直接运行于 Node.js 浏览器 微信小程序端

- 一切逻辑均在微信小程序客户端完成，无需第三方服务器，保证用户隐私。

- Node.js 端文件相关 API 可传入 base64 编码、本地文件路径、图片 url(TODO)

```js
const { Translate, TencentAIError } = require('@khs1994/tencent-ai');

const App = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'your-appkey', // process.env.NODE_TENCENT_AI_APP_KEY
  appid: 'your-appid', // process.env.NODE_TENCENT_AI_APP_ID
};

const translate = new Translate(App.appkey, App.appid);

// 文本翻译（AI Lab）
translate.texttrans('你好').then(
  res => {
    console.log(res);
  },
  e => {
    console.log(e);
  },
);

// Or Using async / await ES7

(async () => {
  try {
    let res = await translate.texttrans('hello');
    console.log(res);
    // error demo
    res = await translate.texttrans();
  } catch (e) {
    console.log(e);
  }
})();
```

### 微信小程序

- 使用 npm 安装，之后在菜单栏选择构建 npm

- 必须将 `https://api.ai.qq.com` 加入 request 合法域名（开发环境请忽略）。

```js
// 解构赋值
const { TencentAI } = require('@khs1994/tencent-ai');

// 以下两项请到 ai.qq.com 控制台查看。
const app_key = '';
const app_id = '';

// 获取全部实例，也可以只获取特定实例，例如 NLP，具体参考上边例子
const ai = new TencentAI(app_key, app_id);

ai.nlp.textchat('hello', 'session_id').then(
  res => {
    // TODO
    console.log(res);
  },
  e => console.log(e),
);
```

- 在小程序端调用文件相关的 API 时(人脸识别、OCR、音频)，可以直接传入文件路径，无需转码。也可传入 base64 编码。

- 由于小程序限制，请避免传入 url。

### TypeScript

```ts
import TencentAI from '@khs1994/tencent-ai';

const app_key = '';
const app_id = '';

const ai = new TencentAI(app_key, app_id);

ai.nlp.textchat('hello', '1').then(res => {
  console.log(res);
});
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
