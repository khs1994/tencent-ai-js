import AbstractTencentAI from './AbstractTencentAI';
import { URIS, commonParams, error } from './util/util';
import Request from './client/Request';
import TencentAIResult from './TencentAIResult';

export default class Person extends AbstractTencentAI {
  /**
   * 人体管理 API 服务类
   *
   * @method newperson 个体创建
   * @method delperson 删除个体
   * @method addface 增加人脸
   * @method delface 删除人脸
   * @method setinfo 设置信息
   * @method getinfo 获取信息
   * @method getgroupids 获取组列表
   * @method getpersonids 获取个体列表
   * @method getfaceids 获取人脸列表
   * @method getfaceinfo 获取人脸信息
   * @method faceidentify 人脸识别
   * @method faceverify 人脸验证
   */

  /**
   * 个体创建
   *
   * 创建一个个体（Person），并将个体放置到指定的组（Group）当中。一个组（Group）里面的个体（Person）总数上限为20000个。如果ID指定的组不存在，则会新建组并创建个体。
   *
   * @see https://ai.qq.com/doc/newperson.shtml
   * @param {String} image 个体图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} person_id 指定的个体（Person）ID
   * @param {String} person_name 名字
   * @param {String} group_ids group
   * @param {String} tag 备注信息
   *
   * @return {Promise} A Promise Object
   */
  newPerson(
    image: string,
    person_name: string,
    group_ids: string,
    person_id: string,
    tag: string,
  ): any {
    if (!this.isWx) {
      if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
        return error('image 不能为空且大小小于1M');
      }
    }

    if (!person_name) {
      return error('person_name 不能为空');
    }
    if (!group_ids) {
      return error('group_ids 不能为空');
    }
    if (!person_id) {
      return error('person_id 不能为空');
    }

    image = this.readFileSync(image);

    return Request.request(
      this.proxy,
      URIS.newperson,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        person_name,
        group_ids,
        person_id,
        tag,
      }),
    );
  }

  /**
   * 删除个体
   *
   * 删除一个个体（Person）。
   *
   * @see https://ai.qq.com/doc/delperson.shtml
   * @param {String} person_id 需要删除的个体（Person）ID
   *
   * @return {Promise} A Promise Object
   */
  deletePerson(person_id: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }

    return Request.request(
      this.proxy,
      URIS.delperson,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        person_id,
      }),
    );
  }

  /**
   * 增加人脸
   *
   * 将一组人脸（Face）加入到一个个体（Person）中。注意，一个人脸只能被加入到一个个体中。 一个个体最多允许包含20个人脸；加入几乎相同的人脸会返回错误。
   *
   * @see https://ai.qq.com/doc/addface.shtml
   * @param {String} images 多个人脸图片之间用“|”分隔 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} person_id  指定的个体（Person）ID
   * @param {String} tag 备注信息
   *
   * @return {Promise} A Promise Object
   */
  addFace(images: string, person_id: string, tag: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }

    images = this.readFileSync(images);

    return Request.request(
      this.proxy,
      URIS.addface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        images,
        person_id,
        tag,
      }),
    );
  }

  /**
   * 删除人脸
   *
   * 删除一个个体（Person）下的人脸（Face），包括特征，属性和ID。
   *
   * @see https://ai.qq.com/doc/delface.shtml
   * @param {String} person_id 指定的个体（Person）ID
   * @param {String} face_ids 需要删除的人脸（Face）ID（多个之间用"\")
   *
   * @return {Promise} A Promise Object
   */
  deleteFace(person_id: string, face_ids: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    if (!face_ids) {
      return error('face_ids 不能为空');
    }

    return Request.request(
      this.proxy,
      URIS.delface,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        person_id,
        face_ids,
      }),
    );
  }

  /**
   * 设置信息
   *
   * 设置个体（Person）的名字或备注
   *
   * @see https://ai.qq.com/doc/setinfo.shtml
   * @param {String} person_id 需要设置的个体（Person）ID
   * @param {String} person_name 新的名字
   * @param {String} tag 备注信息
   *
   * @return {Promise} A Promise Object
   */
  setinfo(person_id: string, person_name: string, tag: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    if (!person_name) {
      return error('person_name 不能为空');
    }
    return Request.request(
      this.proxy,
      URIS.setinfo,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        person_id,
        person_name,
        tag,
      }),
    );
  }

  /**
   * 获取信息
   *
   * 获取一个个体（Person）的信息，包括ID，名字，备注，相关的人脸（Face）ID列表，以及所属组（Group）ID列表。
   *
   * @see https://ai.qq.com/doc/getinfo.shtml
   * @param {String} person_id 需要查询的个体（Person）ID
   *
   * @return {Promise} A Promise Object
   */
  getinfo(person_id: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return Request.request(
      this.proxy,
      URIS.getinfo,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        person_id,
      }),
    );
  }

  /**
   * 获取组列表
   *
   * 获取一个AppId下所有Group ID。
   *
   * @see https://ai.qq.com/doc/getgroupids.shtml
   *
   * @return {Promise} A Promise Object
   */
  getGroupIds(): Promise<TencentAIResult> {
    return Request.request(
      this.proxy,
      URIS.getgroupids,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
      }),
    );
  }

  /**
   * 获取个体列表
   *
   * 获取一个组（Group）中的所有个体（Person）ID 。
   *
   * @see https://ai.qq.com/doc/getpersonids.shtml
   * @param {String} group_id 组（Group）ID
   *
   * @return {Promise} A Promise Object
   */
  getPersonIds(group_id: string): any {
    if (!group_id) {
      return error('group_id 不能为空');
    }
    return Request.request(
      this.proxy,
      URIS.getpersonids,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        group_id,
      }),
    );
  }

  /**
   * 获取人脸列表
   *
   * 获取一个个体（Person）下所有人脸（Face）ID。
   *
   * @see https://ai.qq.com/doc/getfaceids.shtml
   * @param {String} person_id 个体（Person）ID
   *
   * @return {Promise} A Promise Object
   */
  getFaceIds(person_id: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return Request.request(
      this.proxy,
      URIS.getfaceids,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        person_id,
      }),
    );
  }

  /**
   * 获取人脸信息
   *
   * 获取一个人脸（Face）的详细信息
   *
   * @see https://ai.qq.com/doc/getfaceinfo.shtml
   * @param {String} face_id 人脸（Face） ID
   *
   * @return {Promise} A Promise Object
   */
  getFaceinfo(face_id: string): any {
    if (!face_id) {
      return error('face_id 不能为空');
    }
    return Request.request(
      this.proxy,
      URIS.getfaceinfo,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        face_id,
      }),
    );
  }

  /**
   * 人脸识别
   *
   * 对于一个待识别的人脸图片，在一个组（Group）中识别出最相似的N个个体（Person）作为候选人返回，返回的N个个体（Person）按照相似度从大到小排列，N由参数topn指定。
   *
   * @see https://ai.qq.com/doc/faceidentify.shtml
   * @param {String} image 待识别人脸图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} group_id 候选人组ID（个体创建时设定）
   * @param {Number} topn 默认9个 返回的候选人个数可选值范围[1~10]
   *
   * @return {Promise} A Promise Object
   */
  faceIdentify(image: string, group_id: string, topn = 9): any {
    if (!group_id) {
      return error('group_id 不能为空');
    }
    if ((topn && topn < 1) || topn > 10) {
      return error('topn 不能为空且取值范围为[1~10]');
    }

    image = this.readFileSync(image);

    return Request.request(
      this.proxy,
      URIS.faceidentify,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        group_id,
        topn,
      }),
    );
  }

  /**
   * 人脸验证
   *
   * 根据提供的图片和个体（Person）ID，返回图片和个体是否是同一个人的判断以及置信度。
   *
   * @see https://ai.qq.com/doc/faceverify.shtml
   * @param {String} image 待验证人脸图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} person_id  待验证的个体（Person）ID
   *
   * @return {Promise} A Promise Object
   */
  faceVerify(image: string, person_id: string): any {
    if (!person_id) {
      return error('person_id 不能为空');
    }

    image = this.readFileSync(image);

    return Request.request(
      this.proxy,
      URIS.faceverify,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        person_id,
      }),
    );
  }
}
