import node_md5 from '../util/node_md5';

import * as https from 'https';
import * as querystring from 'querystring';
import * as iconv from 'iconv-lite';
// const fs = require('fs');

enum errorCode {
  '参数非法---请检查请求参数是否符合要求' = 4096,
  '应用不存在---请检查app_id是否有效的应用标识（AppId）' = 12289,
  '素材不存在---请检查app_id对应的素材模版id' = 12801,
  '素材ID与应用ID不匹配---请检查app_id对应的素材模版id' = 12802,
  '缺少app_id参数---请检查请求中是否包含有效的app_id参数' = 16385,
  '缺少time_stamp参数---请检查请求中是否包含有效的time_stamp参数' = 16386,
  '缺少nonce_str参数---请检查请求中是否包含有效的nonce_str参数',
  '请求签名无效---请检查请求中的签名信息（sign）是否有效',
  '缺失API权限---请检查应用是否勾选当前API所属接口的权限',
  'time_stamp参数无效---请检查time_stamp距离当前时间是否超过5分钟',
  '同义词识别结果为空---系统识别结果为空',
  '专有名词识别结果为空---系统识别结果为空',
  '意图识别结果为空---系统识别结果为空',
  '闲聊返回结果为空---系统处理结果为空',
  '图片格式非法---请检查图片格式是否符合API要求' = 16396,
  '图片体积过大---请检查图片大小是否超过API限制',
  '图片没有人脸---请检查图片是否包含人脸' = 16402,
  '相似度错误---请联系客服反馈问题',
  '人脸检测失败---请联系客服反馈问题',
  '图片解码失败---请联系客服反馈问题',
  '特征处理失败---请联系客服反馈问题',
  '提取轮廓错误---请联系客服反馈问题',
  '提取性别错误---请联系客服反馈问题',
  '提取表情错误---请联系客服反馈问题',
  '提取年龄错误---请联系客服反馈问题',
  '提取姿态错误---请联系客服反馈问题',
  '提取眼镜错误---请联系客服反馈问题',
  '提取魅力值错误---请联系客服反馈问题',
  '语音合成失败---请联系客服反馈问题',
  '图片为空---请检查图片是否正常',
  '个体已存在---请检查个体是否已存在',
  '个体不存在---请检查个体是否不存在',
  '人脸不存在---请检查人脸是否不存在',
  '分组不存在---请检查分组是否不存在',
  '分组列表不存在---请检查分组列表是否不存在',
  '人脸个数超过限制---请检查是否超过系统限制',
  '个体个数超过限制---请检查是否超过系统限制',
  '组个数超过限制---请检查是否超过系统限制',
  '对个体添加了几乎相同的人脸---请检查个体已添加的人脸',
  '无效的图片格式---请检查图片格式是否符号API要求',
  '图片模糊度检测失败---请联系客服反馈问题',
  '美食图片检测失败---请联系客服反馈问题',
  '提取图像指纹失败---请联系客服反馈问题',
  '图像特征比对失败---请联系客服反馈问题',
  'OCR照片为空---请检查待处理图片是否为空',
  'OCR识别失败---请联系客服反馈问题',
  '输入图片不是身份证---请检查图片是否为身份证',
  '名片无足够文本---请检查名片是否正常',
  '名片文本行倾斜角度太大---请检查名片是否正常',
  '名片模糊---请检查名片是否正常',
  '名片姓名识别失败---请联系客服反馈问题',
  '名片电话识别失败---请联系客服反馈问题',
  '图像为非名片图像---请检查图片是否为名片',
  '检测或者识别失败---请联系客服反馈问题',
  '未检测到身份证---请对准边框(避免拍摄时倾角和旋转角过大、摄像头)',
  '请使用第二代身份证件进行扫描---请使用第二代身份证进行处理',
  '不是身份证正面照片---请使用带证件照的一面进行处理',
  '不是身份证反面照片---请使用身份证反面进行进行处理',
  '证件图片模糊---请确保证件图片清晰',
  '请避开灯光直射在证件表面---请避开灯光直射在证件表面',
  '行驾驶证OCR识别失败---请联系客服反馈问题',
  '通用OCR识别失败---请联系客服反馈问题',
  '银行卡OCR预处理错误---请联系客服反馈问题',
  '银行卡OCR识别失败---请联系客服反馈问题',
  '营业执照OCR预处理失败---请联系客服反馈问题',
  '营业执照OCR识别失败---请联系客服反馈问题',
  '意图识别超时---请联系客服反馈问题',
  '闲聊处理超时---请联系客服反馈问题',
  '语音识别解码失败---请检查语音参数是否正确编码',
  '语音过长或空---请检查语音参数是否正确编码或者长度是否合法',
  '翻译引擎失败---请联系客服反馈问题',
  '不支持的翻译类型---请检查翻译类型参数是否合法',
  '输入图片与识别场景不匹配---请检查场景参数是否正确，所传图片与场景是否匹配' = 16460,
  '识别结果为空---当前图片无法匹配已收录的标签，请尝试更换图片',
}

/**
 * 腾讯AI请求代理类
 *
 * @param {string} uri  请求的URI
 * @param {string} appkey 请求的APP_key
 * @param {Object} opt 请求的数据对象，不包含签名属性,不用进行数据编码
 * @param {Function} resolve 请求正确结果的处理方法
 * @param {Function} reject 请求错误的处理方法
 *
 * @returns ProxyServices实体类
 */
class ProxyServices {
  public postData: any;
  public requestOpt: any;

  constructor(
    readonly uri: string,
    public appkey: any,
    public opt: any,
    public resolve: any,
    public reject: any,
    readonly isGBK: boolean = false,
  ) {
    // this.uri = uri; // 绑定请求资源
    // this.opt = opt; // 绑定基础数据
    // this.resolve = resolve; // 绑定正确处理方法
    // this.reject = reject; // 绑定错误处理方法
    // this.appkey = appkey; // 绑定APPkey
    this.postData = null; // 请求数据
    this.requestOpt = null; // 请求参数
    // this.isGBK = isGBK; // GBK转码特殊操作
    // 初始化
    this.init();
  }

  /**
   * ksort
   *
   * 根据 接口请求参数 升序排序
   *
   * @returns 升序排序结果
   */
  ksort() {
    let arrayList = [];
    let sort = (a: any, b: any) => {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    };

    for (let key in this.opt) {
      arrayList.push({
        key: key,
        value: this.opt[key],
      });
    }

    return arrayList.sort(sort);
  }

  /**
   * getReqSign
   *
   * 根据 接口请求参数 和 应用密钥 计算 请求签名
   *
   * @returns any 签名结果
   */
  getReqSign() {
    let parList: any,
      sign: any,
      str: any = '';
    // 1. 字典升序排序
    parList = this.ksort();
    // 2. 拼按URL键值对
    if (!this.isGBK) {
      parList.map((item: any) => {
        if (item.value !== '') {
          str += `${item.key}=${querystring.escape(item.value)}&`;
        }
      });
    } else {
      parList.map((item: any) => {
        if (item.value !== '') {
          str += `${item.key}=${item.value}&`;
        }
      });
    }
    // 处理URL编码和java、PHP不一致的问题
    str = str.replace(/%20/g, '+');
    // 4. MD5运算+转换大写，得到请求签名
    sign = node_md5(str + `app_key=${this.appkey}`).toUpperCase();
    //console.log(sign)
    return { sign, str };
  }

  /**
   * 代理请求
   * 2018-02-07 修改数据回调，根据返回数据格式进行转码操作
   * 2018-02-25 修改数据回调，提升程序健壮性
   */
  request() {
    let proxy = https
      .request(this.requestOpt, pres => {
        let arrBuf = [],
          bufLength = 0,
          code = pres.headers['content-type'].split('=')[1];
        pres
          .on('data', chunk => {
            arrBuf.push(chunk);
            bufLength += chunk.length;
          })
          .on('end', () => {
            let chunkAll = Buffer.concat(arrBuf, bufLength);
            let decodedBody = iconv.decode(chunkAll, code ? code : 'utf8');

            try {
              let res = JSON.parse(decodedBody);
              // 判断返回码
              if (res.ret === 0) {
                this.resolve(res);
                return;
              }
              res.retMsg = errorCode[res.ret];
              // 错误信息不存在，抛出异常
              this.reject(res);
            } catch (error) {
              this.reject(decodedBody);
            }
          });
      })
      .on('error', e => {
        this.reject(e);
      });

    // 写入数据到请求主体
    // fs.writeFileSync(`${__dirname}\\data.txt`, this.postData, {
    //   encoding: 'utf8',
    // });
    proxy.write(this.postData);
    proxy.end();
  }

  // 初始化
  init() {
    // 计算签名
    let { sign, str } = this.getReqSign();
    this.opt['sign'] = sign;
    // 提交数据组装
    this.postData = !this.isGBK
      ? querystring.stringify(this.opt)
      : str + 'sign=' + sign;
    // 请求数据组装
    this.requestOpt = {
      protocol: 'https:', // <string> 使用的协议。默认为 http:
      hostname: 'api.ai.qq.com', //<string> host 的别名。为了支持 url.parse()，hostname 优先于 host。
      port: 443, //<number> 远程服务器的端口。默认为 80。
      method: 'POST', // <string> 指定 HTTP 请求方法的字符串。默认为 'GET'。
      path: this.uri, // <string> 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(this.postData),
      }, //<Object> 包含请求头的对象
    };
    // 发起请求
    this.request();
  }
}

/**
 * 代理请求处理方法
 * @param {String} URI 请求的URI，例如：'/fcgi-bin/aai/aai_tts'
 * @param {String} appkey 你的app_key
 * @param {Object} OPT 除了签名以外的请求数据对象，不用对数据进行编码，请求会进行编码
 * @param isGBK
 * @example
 *  const fs = require('fs');
 *  // 随机字符串
 *  const randomString = require('randomstring');
 *  const appkey = 'Your APPKEY';
 *  // 基础请求数据
 *  const commonParams = () => {
 *    return {
 *      'app_id': 'Your APPID',
 *      'nonce_str': randomString.generate({
 *        length: 16,
 *        charset: 'alphanumeric',
 *        capitalization: 'uppercase'
 *      }),
 *      'time_stamp': Math.floor(Date.now() / 1000),
 *    }
 *  }
 *  // 文件请求数据
 *  var FSRead = function (dir) {
 *    let FileBase64 = fs.readFileSync(dir, {
 *      encoding: 'base64'
 *    });
 *    return {
 *      image: FileBase64
 *    };
 *  }
 *  // 组装请求数据
 *  var asrparams = Object.assign(commonParams(), FSRead(`file path`));
 *  // 建立一个代理请求
 *  PS('AI URI', appkey, asrparams).then((result) => {
 *    console.log(JSON.stringify(result));
 *  }, (e) => {
 *    // 发生网络错误
 *    console.log(JSON.stringify(e))
 *  });
 * @returns Promise
 * @update
 *  2018-02-07 增加判断是否进行GBK处理参数 V1.1.3
 */
module.exports = function(URI: any, appkey: any, OPT: any, isGBK: boolean) {
  return new Promise((resolve, reject) => {
    new ProxyServices(URI, appkey, OPT, resolve, reject, isGBK);
  });
};
