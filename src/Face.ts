import AbstractTencentAI from './AbstractTencentAI';
import { URIS, commonParams, error } from './util/util';
import Request from './client/Request';
import Detect from './Interface/Face/Detect';

export default class Face extends AbstractTencentAI {
  /**
   * 面部识别 API 服务类
   *
   * @method detectface 人脸分析
   * @method detectmultiface 多人脸检测
   * @method facecompare 人脸对比
   * @method detectcrossageface 跨年龄人脸识别
   * @method faceshape 五官定位
   */

  /**
   * 人脸分析
   *
   * 检测给定图片（Image）中的所有人脸（Face）的位置和相应的面部属性。位置包括（x, y, w, h），面部属性包括性别（gender）, 年龄（age）, 表情（expression）, 魅力（beauty）, 眼镜（glass）和姿态（pitch，roll，yaw）
   *
   * @see https://ai.qq.com/doc/detectface.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   * @param {Number} mode 默认1 检测模式，0-正常，1-大脸模式
   *
   * @return {Promise} A Promise Object
   */
  async detect(image: string, mode: 0 | 1 = 1): Promise<Detect> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.detectface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        mode,
      }),
    );
  }

  /**
   * 多人脸检测
   *
   * 检测图片中的人脸位置，可以识别出一张图片上的多个人脸。
   *
   * @see https://ai.qq.com/doc/detectmultiface.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB）
   *
   * @return {Promise} A Promise Object
   */
  async detectmulti(image: string) {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.detectmultiface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 人脸对比
   *
   * 对请求图片的两个人脸进行对比，计算相似性以及五官相似度
   *
   * @see https://ai.qq.com/doc/facecompare.shtml
   * @param {String} image_a 待对比人脸图片A 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB, 支持JPG、PNG、BMP格式）
   * @param {String} image_b 待对比人脸图片B 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB, 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async compare(image_a: string, image_b: string) {
    image_a = await this.readFileSync(image_a);
    image_b = await this.readFileSync(image_b);

    return Request(
      this.proxy,
      URIS.facecompare,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image_a,
        image_b,
      }),
    );
  }

  /**
   * 跨年龄人脸识别
   *
   * 对比两张图片，并找出相似度最高的两张人脸；支持多人合照、两张图片中的人处于不同年龄段的情况。 建议：source_image中的人脸尽量不超过10个，target_image中的人脸尽量不超过15个。
   *
   * @see https://ai.qq.com/doc/detectcrossageface.shtml
   * @param {String} source_image 待比较图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB）
   * @param {String} target_image 待比较图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB）
   *
   * @return {Promise} A Promise Object
   */
  async detectcrossage(source_image: string, target_image: string) {
    source_image = await this.readFileSync(source_image);
    target_image = await this.readFileSync(target_image);

    return Request(
      this.proxy,
      URIS.detectcrossageface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        source_image,
        target_image,
      }),
    );
  }

  /**
   * 五官定位
   *
   * 对请求图片进行五官定位，计算构成人脸轮廓的88个点，包括眉毛（左右各8点）、眼睛（左右各8点）、鼻子（13点）、嘴巴（22点）、脸型轮廓（21点）
   *
   * @see https://ai.qq.com/doc/faceshape.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   * @param {Number} mode 默认1 检测模式，0-正常，1-大脸模式
   *
   * @return {Promise} A Promise Object
   */
  async shape(image: string, mode: 0 | 1 = 1) {
    if ((mode && mode < 0) || mode > 1) {
      return error('mode 不能为空且检测模式，0-正常，1-大脸模式');
    }

    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.faceshape,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        mode,
      }),
    );
  }
}
