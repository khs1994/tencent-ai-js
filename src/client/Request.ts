export default class Request {
  static request(
    url: string,
    appKey: string,
    data: any,
    isGbk: boolean = false,
    method: string = 'get',
  ) {
    const request = require('node-fetch');

    method = method.toUpperCase();

    if (isGbk) {
    }

    return request(url, {
      method,
    });
  }

  static handle_gbk() {}
}
