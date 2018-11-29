import TencentAIError from './Error/TencentAIError';

export default abstract class AbstractTencentAI {
  public constructor(readonly appKey: string, readonly appId: string | number) {
    if (!appKey || !appId) {
      throw new TencentAIError('appKey and appId are required');
    }
  }
}
