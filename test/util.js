'use strict';

/**
 * 测试通用类
 */
const fs = require('fs');

module.exports.APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'ZbRY9cf72TbDO0xb',
  appid: '1106560031',
};

module.exports.fsReadSync = function(fsPath) {
  return fs.readFileSync(fsPath, {
    encoding: 'base64',
  });
};

module.exports.ttformat = {
  '1': 'pcm',
  '2': 'wav',
  '3': 'mp3',
};
