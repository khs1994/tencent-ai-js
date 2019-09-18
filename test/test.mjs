import TencetAI from '../dist/tencent-ai.mjs';
import * as assert from 'assert';
const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: process.env.NODE_TENCENT_AI_APP_KEY,
  appid: process.env.NODE_TENCENT_AI_APP_ID,
};

const ai = new TencetAI(APP.appkey, APP.appid);

ai.translate.text('hello').then(
  res => {
    assert.strictEqual(res.data.target_text, '你好');
  },
  e => console.log(e),
);

ai.nlp.seg('你好').then((res)=>{
  assert.strictEqual(res.ret,0);
},(e)=>{
  console.log(e);
});
