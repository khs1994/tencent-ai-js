import TencentAIError from './Error/TencentAIError';
import readFileSync from './util/wxFs';
// import { error } from './util/util';
import readFileNodeHandler from './util/fs/readFileNodeHandler';
import readFileDenoHandler from './util/fs/readFileDenoHandler';
import runtime from './util/runtime';

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
    this.runtime = runtime();

    this.isWx = this.runtime === 'wx';
    this.isDeno = this.runtime === 'deno';
    this.isBrowser = this.runtime === 'browser';
    this.isNode = this.runtime === 'node';
  }

  public async readFileSync(file: string, limit: number = 0): Promise<string> {
    if (this.isWx) {
      return await readFileSync(file);
    }

    if (this.isNode) {
      return await readFileNodeHandler(file, limit);
    }

    if (this.isDeno) {
      return await readFileDenoHandler(file, limit);
    }

    return file;
  }
}
