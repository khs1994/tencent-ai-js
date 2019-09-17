import TencentAIError from './Error/TencentAIError';
import readFileSync from './util/wxFs';

export default abstract class AbstractTencentAI {
  public isWx: boolean = false;
  public isDeno: boolean = false;
  public isBrowser: boolean = false;
  public isNode: boolean = false;
  public runtime: string = 'unknown';
  public supportFetch: boolean = false;

  public constructor(
    readonly appKey: string,
    readonly appId: string | number,
    readonly proxy: string = 'https://api.ai.qq.com',
  ) {
    if (!appKey || !appId) {
      throw new TencentAIError('appKey and appId are required');
    }

    this.supportFetch = typeof fetch === 'function';

    if (typeof global === 'object' && typeof Buffer !== 'undefined') {
      // node
      this.isNode = true;
      this.runtime = 'node';
      return;
    }

    // @ts-ignore
    if (typeof wx !== 'undefined' && typeof wx.authorize === 'function') {
      // wx
      this.isWx = true;
      this.runtime = 'wx';
      return;
    }

    if (typeof window === 'undefined') {
      this.runtime = 'unknown';
      return;
    }

    // @ts-ignore
    if (typeof window.Deno !== 'undefined') {
      // deno
      this.isDeno = true;
      this.runtime = 'deno';
      return;
    }

    // @ts-ignore
    if (typeof window.Deno === 'undefined') {
      // browser
      this.isBrowser = true;
      this.runtime = 'browser';
      return;
    }
  }

  public readFileSync(file: string, limit: number = 0) {
    if (this.isWx) {
      return readFileSync(file);
    } else {
      if (typeof window === 'undefined') {
        // node.js

        // 编码 直接返回

        // if (typeof Buffer !== 'undefined') {
        //   if (Buffer.byteLength(image, 'base64') >= 1048576) {
        //     return error('大小超出 1M');
        //   }
        // }

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
