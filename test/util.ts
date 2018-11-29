/**
 * 测试通用类
 */

import * as fs from 'fs';

const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: process.env.NODE_TENCENT_AI_APP_KEY,
  appid: process.env.NODE_TENCENT_AI_APP_ID,
};

const fsReadSync = function(fsPath) {
  return fs.readFileSync(fsPath, {
    encoding: 'base64',
  });
};

const ttformat = {
  '1': 'pcm',
  '2': 'wav',
  '3': 'mp3',
};

export { APP, fsReadSync, ttformat };
