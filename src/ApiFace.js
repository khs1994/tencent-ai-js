'use strict';

const { URIS, commonParams, error } = require('./util');

const PS = require('./client/ProxyServices');

module.exports = class Face {
  /**
   * 面部识别 API 服务类
   *
   * @param {String} appKey 应用key
   * @param {String} appId 应用id
   * @method detectface 人脸分析
   * @method detectmultiface 多人脸检测
   * @method facecompare 人脸对比
   * @method detectcrossageface 跨年龄人脸识别
   * @method faceshape 五官定位
   */
  constructor(appKey, appId) {
    if (!appKey || !appId) {
      throw new Error('appKey and appId are required');
    }
    this.appKey = appKey;
    this.appId = appId;
  }

  /**
   * 人脸分析
   *
   * 检测给定图片（Image）中的所有人脸（Face）的位置和相应的面部属性。位置包括（x, y, w, h），面部属性包括性别（gender）, 年龄（age）, 表情（expression）, 魅力（beauty）, 眼镜（glass）和姿态（pitch，roll，yaw）
   *
   * @see https://ai.qq.com/doc/detectface.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {Number} mode 默认1 检测模式，0-正常，1-大脸模式
   *
   * @return {PS} A Promise Object
   */
  detectface(image, mode = 1) {
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小于1M');
    }
    if ((mode && mode < 0) || mode > 1) {
      return error('mode 不能为空且检测模式，0-正常，1-大脸模式');
    }
    return PS(
      URIS.detectface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
        mode: mode,
      })
    );
  }

  /**
   * 多人脸检测
   *
   * 检测图片中的人脸位置，可以识别出一张图片上的多个人脸。
   *
   * @see https://ai.qq.com/doc/detectmultiface.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   *
   * @return {PS} A Promise Object
   */
  detectmultiface(image) {
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小于1M');
    }
    return PS(
      URIS.detectmultiface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
      })
    );
  }

  /**
   * 人脸对比
   *
   * 对请求图片的两个人脸进行对比，计算相似性以及五官相似度
   *
   * @see https://ai.qq.com/doc/facecompare.shtml
   * @param {String} image_a 待对比人脸图片A 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} image_b 待对比人脸图片B 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   *
   * @return {PS} A Promise Object
   */
  facecompare(image_a, image_b) {
    if (image_a && Buffer.byteLength(image_a, 'base64') >= 1048576) {
      return error('image_a 不能为空且大小小于1M');
    }
    if (image_b && Buffer.byteLength(image_b, 'base64') >= 1048576) {
      return error('image_b 不能为空且大小小于1M');
    }
    return PS(
      URIS.facecompare,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image_a: image_a,
        image_b: image_b,
      })
    );
  }

  /**
   * 跨年龄人脸识别
   *
   * 对比两张图片，并找出相似度最高的两张人脸；支持多人合照、两张图片中的人处于不同年龄段的情况。 建议：source_image中的人脸尽量不超过10个，target_image中的人脸尽量不超过15个。
   *
   * @see https://ai.qq.com/doc/detectcrossageface.shtml
   * @param {String} source_image 待比较图片 原始图片的base64编码数据（原图大小上限1MB）
   * @param {String} target_image 待比较图片 原始图片的base64编码数据（原图大小上限1MB）
   * @example
   *
   * @return {PS} A Promise Object
   */
  detectcrossageface(source_image, target_image) {
    if (source_image && Buffer.byteLength(source_image, 'base64') >= 1048576) {
      return error('source_image 不能为空且大小小于1M');
    }
    if (target_image && Buffer.byteLength(target_image, 'base64') >= 1048576) {
      return error('target_image 不能为空且大小小于1M');
    }
    return PS(
      URIS.detectcrossageface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        source_image: source_image,
        target_image: target_image,
      })
    );
  }

  /**
   * 五官定位
   *
   * 对请求图片进行五官定位，计算构成人脸轮廓的88个点，包括眉毛（左右各8点）、眼睛（左右各8点）、鼻子（13点）、嘴巴（22点）、脸型轮廓（21点）
   *
   * @see https://ai.qq.com/doc/faceshape.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {Number} mode 默认1 检测模式，0-正常，1-大脸模式
   *
   * @return {PS} A Promise Object
   */
  faceshape(image, mode = 1) {
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小于1M');
    }
    if ((mode && mode < 0) || mode > 1) {
      return error('mode 不能为空且检测模式，0-正常，1-大脸模式');
    }
    return PS(
      URIS.faceshape,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
        mode: mode,
      })
    );
  }
};
