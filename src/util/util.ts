/**
 * 定义通用类
 *
 * @exports URIS 请求接口地址数据
 * @exports commonParams 签名通用字段处理方法 时间和随机字符串
 * @exports error 参数错误处理方法， 模拟服务器返回 通用定义错误类型为4096
 */
import hex_md5 from './md5';
// import TencentAIResult from '../TencentAIResult';

export { urlencode } from './urlencode';
export { URIS } from './URIS';
export { textToGBK } from './textToGBK';

export const commonParams = (): {
  nonce_str: string;
  time_stamp: number;
} => {
  return {
    // nonce_str: randomString.generate({
    //   length: 16,
    //   charset: 'alphanumeric',
    //   capitalization: 'uppercase',
    // }),
    nonce_str: hex_md5(Date.now().toString()),
    time_stamp: Math.floor(Date.now() / 1000),
  };
};

export const error = (msg: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    reject({
      ret: 4096,
      msg: msg,
      data: {},
    });
  });
};
