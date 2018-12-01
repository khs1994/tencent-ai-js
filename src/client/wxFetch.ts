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
  charset?: string;
}

class Headers {
  constructor(public headers) {}

  get(key) {
    for (let obj_key in this.headers) {
      if (key.toUpperCase() === obj_key.toUpperCase()) {
        return this.headers[obj_key];
      }
    }
  }

  has(key) {
    return !!this.get(key);
  }

  keys() {}

  values() {}
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
    this.headers = new Headers(res.header);
    this.redirected = false;
    this.status = res.statusCode;
    this.statusText = 'OK';
    this.type = 'cors';
  }

  json() {
    return Promise.resolve(this.res.data);
  }

  buffer() {
    return Promise.resolve(new Int8Array(this.res.data));
  }
}

// declare const wx: any;

export default function wxFetch(url: string, options: FetchInterface = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: options.body || undefined,
      header: options.headers || undefined,
      method: options.method || 'GET',
      dataType: options.charset === 'utf8' ? 'json' : '',
      responseType: options.charset === 'utf8' ? 'text' : 'arraybuffer',
      success(res: any) {
        resolve(new Response(url, res));
      },
      fail(e: any) {
        reject(e);
      },
    });
  });
}
