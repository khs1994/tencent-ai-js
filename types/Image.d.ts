import AbstractTencentAI from './AbstractTencentAI';
export default class Image extends AbstractTencentAI {
    /**
     * 图片识别公共 API 服务类
     *
     * @method porn(imageBase64String) 智能鉴黄
     * @method terrorism(imageBase64String) 暴恐识别
     * @method scener(imageBase64String) 场景识别
     * @method objectr(imageBase64String) 物体识别
     * @method imagetag(imageBase64String) 图像标签识别
     * @method imgidentify(imageBase64String) 花草/车辆识别
     * @method imgtotext(imageBase64String) 看图说话
     * @method imagefuzzy(imageBase64String) 模糊图片检测
     * @method imagefood(imageBase64String) 获取人脸信息
     */
    /**
     * 智能鉴黄
     *
     * 识别一个图像是否为色情图像
     *
     * @see https://ai.qq.com/doc/jianhuang.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
     * @param {String} image_url
     *
     * @return {Promise} A Promise Object
     */
    porn(image?: string, image_url?: string): any;
    /**
     * 暴恐识别
     *
     * 识别一个图像是否为暴恐图像
     *
     * @see https://ai.qq.com/doc/imageterrorism.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
     * @param {String} image_url
     *
     * @return {Promise} A Promise Object
     */
    terrorism(image?: string, image_url?: string): any;
    /**
     * 场景识别
     *
     * 场景识别接口提供场景识别能力，可以帮您快速找出图片中包含的场景信息。
     *
     * @see https://ai.qq.com/doc/visionimgidy.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     * @param {Number} format 默认1 图片格式 [1  JPG格式（image/jpeg）]
     * @param {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
     *
     * @return {Promise} A Promise Object
     */
    scener(image: any, format?: number, topk?: number): any;
    /**
     * 物体识别
     *
     * 物体识别接口提供物体识别能力，可以帮您快速找出图片中包含的物体信息。
     *
     * @see https://ai.qq.com/doc/visionimgidy.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     * @param {Number} format 默认1 图片格式 [1  JPG格式（image/jpeg）]
     * @param {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
     *
     * @return {Promise} A Promise Object
     */
    objectr(image: any, format?: number, topk?: number): any;
    /**
     * 图像标签识别
     *
     * 识别一个图像的标签信息,对图像分类
     *
     * @see https://ai.qq.com/doc/imagetag.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     *
     * @return {Promise} A Promise Object
     */
    imagetag(image: any): any;
    /**
     * 花草/车辆识别
     *
     * 花草/车辆识别接口提供特定类别的识别能力，可以根据您选择的场景识别出图片中的花草或车辆信息，目前已覆盖3000种常见花草，近3000类车型。
     *
     * @see https://ai.qq.com/doc/imgidentify.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     * @param {Number} scene  识别场景，1-车辆识别，2-花草识别
     *
     * @return {Promise} A Promise Object
     */
    imgidentify(image: any, scene?: 1 | 2): any;
    /**
     * 看图说话
     *
     * 用一句话文字描述图片。
     *
     * @see https://ai.qq.com/doc/imgtotext.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     * @param {String} session_id  一次请求ID 尽可能唯一，长度上限64字节
     *
     * @return {Promise} A Promise Object
     */
    imgtotext(image: any, session_id: any): any;
    /**
     * 模糊图片检测
     *
     * 判断一个图像的模糊程度。
     *
     * @see https://ai.qq.com/doc/imagefuzzy.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     *
     * @return {Promise} A Promise Object
     */
    imagefuzzy(image: any): any;
    /**
     * 美食图片识别
     *
     * 识别一个图像是否为美食图像。
     *
     * @see https://ai.qq.com/doc/imagefood.shtml
     * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
     *
     * @return {Promise} A Promise Object
     */
    imagefood(image: any): any;
}