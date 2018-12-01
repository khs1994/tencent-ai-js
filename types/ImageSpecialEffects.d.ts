import AbstractTencentAI from './AbstractTencentAI';
export default class ImageSpecialEffects extends AbstractTencentAI {
    /**
     * 图片特效API服务类
     *
     * @method facecosmetic(image, cosmetic) 人脸美妆
     * @method facedecoration(image, decoration) 人脸变妆
     * @method ptuimgfilter(image, filter) 图片滤镜（天天P图）
     * @method visionimgfilter(image, filter, session_id) 图片滤镜（AI Lab）
     * @method facemerge(image, model) 人脸融合
     * @method facesticker(image, sticker) 大头贴
     * @method faceage(image) 颜龄检测
     */
    /**
     * 人脸美妆
     *
     * 人脸美妆接口提供人脸美妆特效功能，可以帮您快速实现原始图片的人脸美妆特效处理
     *
     * @see https://ai.qq.com/doc/facecosmetic.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     * @param {Number} cosmetic 美妆编码取值区间[1-23]
     *
     * @return {Promise} A Promise Object
     */
    facecosmetic(image: any, cosmetic?: number): any;
    /**
     * 人脸变妆
     *
     * 人脸变妆接口提供人脸变妆特效功能，可以帮您快速实现原始图片的人脸变妆特效处理。
     *
     * @see https://ai.qq.com/doc/facedecoration.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     * @param {Number} decoration 人脸变妆编码取值区间[1-22]
     *
     * @return {Promise} A Promise Object
     */
    facedecoration(image: any, decoration?: number): any;
    /**
     * 图片滤镜(天天P图)
     *
     * 图片滤镜接口提供滤镜特效功能，可以帮您快速实现原始图片的滤镜特效处理。
     *
     * @see https://ai.qq.com/doc/ptuimgfilter.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     * @param {Number} filter 滤镜特效编码取值区间[1-32]
     *
     * @return {Promise} A Promise Object
     */
    ptuimgfilter(image: any, filter: any): any;
    /**
     * 图片滤镜（AI Lab）
     *
     * 图片滤镜接口提供滤镜特效功能，可以帮您快速实现原始图片的滤镜特效处理
     *
     * @see https://ai.qq.com/doc/ptuimgfilter.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限1MB）
     * @param {Number} filter 滤镜特效编码取值区间[1-65]
     * @param {String} session_id 一次请求ID 尽可能唯一，长度上限64字节
     *
     * @return {Promise} A Promise Object
     */
    visionimgfilter(image: any, filter: any, session_id: any): any;
    /**
     * 人脸融合
     *
     * 人脸融合接口提供人脸融合特效功能，可以帮您快速实现原始图片的人脸融合特效处理
     *
     * @see https://ai.qq.com/doc/facemerge.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     * @param {Number} model 默认素材模板编码见下文描述 取值区间[1-50]；自定义素材模板可在应用详情页上传和查询
     *
     * @return {Promise} A Promise Object
     * @deprecated Not Available on 2018-11-30
     */
    facemerge(image: any, model: any): any;
    /**
     * 大头贴
     *
     * 大头贴接口提供大头贴特效功能，可以帮您快速实现原始图片的大头贴特效处理。
     *
     * @see https://ai.qq.com/doc/facesticker.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     * @param {Number} sticker 大头贴编码 取值区间[1-31]
     *
     * @return {Promise} A Promise Object
     */
    facesticker(image: any, sticker: any): any;
    /**
     * 颜龄检测
     *
     * 颜龄检测接口提供颜龄检测功能，可以帮您快速实现原始图片的颜龄检测处理。
     *
     * @see https://ai.qq.com/doc/faceage.shtml
     * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
     *
     * @return {Promise} A Promise Object
     */
    faceage(image: any): any;
}