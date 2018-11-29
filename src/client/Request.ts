import { error, urlencode } from '../util/util';
// import node_md5 from '../util/node_md5';
// import * as querystring from 'querystring';
import hex_md5 from '../util/md5';
import wxFetch from './wxFetch';

const querystring = require('qs');

export default class Request {
  private static requestInstance: any;

  static request(
    url: string,
    appKey: string,
    data: any,
    isGbk: boolean = false,
    method: string = 'post',
  ) {
    // let is_wx = false;

    if (!this.requestInstance) {
      try {
        this.requestInstance = require('node-fetch');
      } catch (e) {
        this.requestInstance = wxFetch;
      }
    }

    url = 'https://api.ai.qq.com' + url;
    method = method.toUpperCase();

    // 按 key 进行字典升序排序,得到有序的参数对列表N
    let sort_list = this.ksort(data);

    // 参数对按 URL 键值对的格式拼接成字符串
    let str = this.handle_gbk(sort_list, isGbk);

    // 追加 app_key
    // MD5运算，将得到的 MD5 值所有字符转换成大写，得到接口请求签名
    let sign = hex_md5(str + `app_key=${appKey}`);

    sign = sign.toUpperCase();

    data['sign'] = sign;

    let body = isGbk ? str + `sign=${sign}` : querystring.stringify(data);

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.requestInstance(url, {
      method,
      headers,
      body,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return error('error');
        }
      })
      .then(res => res)
      .catch(e => Promise.reject(e));
  }

  static handle_gbk(sort_list: any, isGbk: boolean = false) {
    let str = '';

    if (!isGbk) {
      // 不是 gbk 进行编码
      sort_list.map(item => {
        if (item.value !== '') {
          // str += `${item.key}=${querystring.escape(item.value)}&`;
          // str += `${item.key}=${urlencode(item.value)}&`;
          str += `${item.key}=${encodeURIComponent(item.value)}&`;
        }
      });
    } else {
      // 是 gbk, 已编码，不再进行编码
      sort_list.map(item => {
        if (item.value !== '') {
          str += `${item.key}=${item.value}&`;
        }
      });
    }

    str = str.replace(/%20/g, '+');

    return str;
  }

  static ksort(data: any) {
    let arrayList = [];
    let sort = (a, b) => {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    };

    for (let key in data) {
      arrayList.push({
        key,
        value: data[key],
      });
    }

    return arrayList.sort(sort);
  }
}
