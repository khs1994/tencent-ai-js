import TencentAIError from './Error/TencentAIError';
import readFileSync from './util/wxFs';

export default abstract class AbstractTencentAI {
  public isWx = false;

  public constructor(
    readonly appKey: string,
    readonly appId: string | number,
    readonly proxy: string = 'https://api.ai.qq.com',
  ) {
    if (!appKey || !appId) {
      throw new TencentAIError('appKey and appId are required');
    }

    if (typeof wx !== 'undefined') {
      this.isWx = true;
    }
  }

  public readFileSync(file: string) {
    if (this.isWx) {
      return readFileSync(file);
    } else {
      if (typeof window === 'undefined') {
        // node.js

        // 编码 直接返回

        // TODO 网址

        // 本地文件 读取后返回
        const fs = require('fs');

        try {
          fs.accessSync(file);

          // 是文件，转码
          return fs.readFileSync(file, {
            encoding: 'base64',
          });
        } catch (e) {
          // 不是文件，直接返回
          return file;
        }
      } // end if

      return file;
    }
  }
}
