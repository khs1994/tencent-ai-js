# TencentAI Node.js SDK

**Fork from https://github.com/w89612b/qqai-api-sdk**

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
