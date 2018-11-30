import TencentAIError from './Error/TencentAIError';
import readFileSync from './util/wxFs';

export default abstract class AbstractTencentAI {
  public isWx = false;

  public constructor(readonly appKey: string, readonly appId: string | number) {
    if (!appKey || !appId) {
      throw new TencentAIError('appKey and appId are required');
    }

    if (typeof wx !== 'undefined') {
      this.isWx = true;
    }
  }

  public readFileSync(file) {
    if (this.isWx) {
      return readFileSync(file);
    } else {
      return file;
    }
  }
}
