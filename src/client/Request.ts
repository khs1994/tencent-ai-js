import { error } from '../util/util';
// import node_md5 from '../util/node_md5';
import TencentAIResult from '../TencentAIResult';
// import * as querystring from 'qs';
import errorCode from '../util/errorCode';
import gbk from '../util/gbk.js/index';
import signHandler from '../util/sign';
import node_fetch from 'node-fetch';
// @ts-ignore
import wx_fetch from 'wx-fetch';

export default async function(
  proxy: string,
  url: string,
  appKey: string,
  data: any,
  isGbk: boolean = false,
  method: string = 'post',
): Promise<TencentAIResult> {
  let fetchHandler: typeof fetch;

  if (typeof fetch === 'function') {
    // browser
    // deno
    // @ts-ignore
    fetchHandler = fetch;
  } else if (typeof Buffer === 'function') {
    // @ts-ignore
    fetchHandler = node_fetch;
  } else if (typeof wx === 'object') {
    // @ts-ignore
    fetchHandler = wx_fetch;
  } else {
    return Promise.reject('fetch not found');
  }

  url = proxy + url;
  method = method.toUpperCase();

  const { sign, str } = signHandler(data, appKey, isGbk);

  let body = str + `sign=${sign}`;

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  let charset: string = isGbk ? 'gbk' : 'utf8';

  const fetchResult: Response = await fetchHandler(url, {
    method,
    headers,
    body,
    // @ts-ignore
    charset,
  });

  if (!fetchResult.ok) {
    return error('error');
  }

  charset = fetchResult.headers
    .get('content-type')
    .split(';')[1]
    .split('=')[1];

  let json: any;

  if (charset === 'gbk') {
    let arrayBuffer = await fetchResult.arrayBuffer();
    // 返回 buffer
    // const iconv = require('iconv-lite');
    // res = iconv.decode(res, charset);
    // @ts-ignore
    let string = gbk.decode(new Uint8Array(arrayBuffer));

    json = JSON.parse(string);
  } else {
    json = await fetchResult.json();
  }

  // 返回 json

  if (json.ret === 0) {
    return json;
  }

  return Promise.reject({
    ret: json.ret,
    msg: errorCode[json.ret] || json.msg || '',
    data: {},
  });
}
