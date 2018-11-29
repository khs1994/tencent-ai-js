interface FetchInterface extends Object {
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    | 'string';
  headers?: any;
  body?: any;
  mode?: any;
  credentials?: any;
  cache?: any;
  redirect?: any;
  referrer?: any;
  referrerPolicy?: any;
  integrity?: any;
  keepalive?: any;
  signal?: any;
}

class Response {
  public bodyUsed;
  public ok;
  public headers;
  public redirected;
  public status;
  public statusText;
  public type;

  constructor(public url: string, public res: any) {
    this.res = res;
    this.bodyUsed = false;
    this.ok = true;
    this.headers = res.header;
    this.redirected = false;
    this.status = res.statusCode;
    this.statusText = 'OK';
    this.type = 'cors';
  }

  json() {
    return Promise.resolve(this.res.data);
  }
}

export default function wxFetch(url: string, options: FetchInterface = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: options.body || undefined,
      header: options.headers || undefined,
      method: options.method || 'GET',
      dataType: 'json',
      success(res: any) {
        resolve(new Response(url, res));
      },
      fail(e: any) {
        reject(e);
      },
    });
  });
}
