import { error } from '../util/util';
import node_md5 from '../util/node_md5';
import * as querystring from 'querystring';
import hex_md5 from '../util/md5';

export default class Request {
  static request(
    url: string,
    appKey: string,
    data: any,
    isGbk: boolean = false,
    method: string = 'post',
  ) {
    let is_wx = false;
    let request;

    try {
      request = require('node-fetch');
    } catch (e) {
      is_wx = true;
    }

    url = 'https://api.ai.qq.com' + url;
    method = method.toUpperCase();

    // 按 key 进行字典升序排序,得到有序的参数对列表N
    let sort_list = this.ksort(data);

    // 参数对按 URL 键值对的格式拼接成字符串
    let str = this.handle_gbk(sort_list, isGbk);

    // 追加 app_key
    // MD5运算，将得到的 MD5 值所有字符转换成大写，得到接口请求签名
    let sign = is_wx
      ? hex_md5(str + `app_key=${appKey}`)
      : node_md5(str + `app_key=${appKey}`);

    sign = sign.toUpperCase();

    data['sign'] = sign;

    let body = isGbk ? str + `sign=${sign}` : querystring.stringify(data);

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (is_wx) {
      return new Promise((resolve, reject) => {
        // @ts-ignore
        wx.request({
          url,
          method,
          data: body,
          header: headers,
          success(res: any) {
            resolve(res);
          },
          fail(e: any) {
            reject(e);
          },
        });
      });
    }

    return request(url, {
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
      .then(res => res);
  }

  static handle_gbk(sort_list: any, isGbk: boolean = false) {
    let str = '';

    if (!isGbk) {
      sort_list.map(item => {
        if (item.value !== '') {
          str += `${item.key}=${querystring.escape(item.value)}&`;
        }
      });
    } else {
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
