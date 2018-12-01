import AbstractTencentAI, { TencentAIReturn } from './AbstractTencentAI';
import Request from './client/Request';
import { URIS, commonParams, error } from './util/util';

export default class Translate extends AbstractTencentAI {
  /**
   * 机器翻译API构造函数
   *
   * @method texttrans(Object) 文本翻译（AI Lab）
   * @method texttranslate(Object) 文本翻译（翻译君）
   * @method imagetranslate(Object) 图片翻译
   * @method speechtranslate(Object) 语音翻译
   * @method textdetect(Object) 语种识别
   */

  /**
   * 文本翻译（AI Lab）
   *
   * 文本翻译接口提供自动翻译能力，可以帮您快速完成一段文本的翻译，支持中、英、德、法、日、韩、西、粤语种。
   *
   * @see https://ai.qq.com/doc/nlptrans.shtml
   * @param {String} text  UTF-8编码，非空且长度上限1024字节
   * @param {Number} type
   * 0  自动识别（中英文互转）
   * 1  中文翻译成英文
   * 2  英文翻译成中文
   * 3  中文翻译成西班牙文
   * 4  西班牙文翻译成中文
   * 5  中文翻译成法文
   * 6  法文翻译成中文
   * 7  英文翻译成越南语
   * 8  越南语翻译成英文
   * 9  中文翻译成粤语
   * 10  粤语翻译成中文
   * 11  中文翻译成韩文
   * 13  英文翻译成德语
   * 14  德语翻译成英文
   * 15  中文翻译成日文
   * 16  日文翻译成中文
   *
   * @return {Promise} A Promise Object
   */
  texttrans(text: string, type: number = 0): Promise<TencentAIReturn> {
    return Request.request(
      URIS.texttrans,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        type: type,
        text: text,
      }),
    );
  }

  /**
   * 文本翻译（翻译君）
   *
   * 文本翻译接口提供自动翻译能力，可以帮您快速完成一段文本的翻译，支持多种语言之间的互译。
   *
   * @see https://ai.qq.com/doc/nlptrans.shtml
   * @param {String} text  UTF-8编码，非空且长度上限1024字节
   * @param {String} source  默认 auto  中文  zh/英文  en/日文  jp/韩文  kr/法文  fr/西班牙文  es/意大利文  it/德文  de/土耳其文  tr/俄文  ru/葡萄牙文  pt/越南文  vi/印度尼西亚文  id/马来西亚文  ms/泰文  th/自动识别（中英互译）  auto
   * @param {string} target   默认 en
   * en=>>zh, fr, es, it, de, tr, ru, pt, vi, id, ms, th----
   * zh=>>en, fr, es, it, de, tr, ru, pt, vi, id, ms, th, jp, kr----
   * fr=>>en, zh, es, it, de, tr, ru, pt----
   * es=>>en, zh, fr, it, de, tr, ru, pt----
   * it=>>en, zh, fr, es, de, tr, ru, pt----
   * de=>>en, zh, fr, es, it, tr, ru, pt----
   * tr=>>en, zh, fr, es, it, de, ru, pt----
   * ru=>>en, zh, fr, es, it, de, tr, pt----
   * pt=>>en, zh, fr, es, it, de, tr, ru----
   * vi=>>en, zh----
   * id=>>en, zh----
   * ms=>>en, zh----
   * th=>>en, zh----
   * jp=>>zh----
   * kr=>>zh----
   *
   * @return {Promise} A Promise Object
   */
  texttranslate(
    text: string,
    source: string = 'auto',
    target: string = 'zh',
  ): Promise<TencentAIReturn> {
    return Request.request(
      URIS.texttranslate,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        source: source,
        target: target,
      }),
    );
  }

  /**
   * 图片翻译
   *
   * 识别图片中的文字，并进行翻译
   *
   * @see https://ai.qq.com/doc/imagetranslate.shtml
   * @param {string} image  原始图片的base64编码数据（原图大小上限1MB）
   * @param {string} session_id 一次请求ID（尽可能唯一，长度上限64字节）
   * @param {string} scene 默认 word word-单词识别，doc-文档识别
   * @param {string} source 默认 auto 中文  zh \ 英文  en \ 日文  jp \ 韩文  kr \ 自动识别（中英互译）  auto
   * @param {string} target 默认 en en=>zh \ zh=>en,jp,kr \j p=>zh \ kr=>zh
   *
   * @return {Promise} A Promise Object
   */
  imagetranslate(
    image: string,
    session_id: string,
    scene: string = 'word',
    source: string = 'auto',
    target: string = 'en',
  ): any {
    if (!this.isWx) {
      if (Buffer.byteLength(image, 'base64') > 1048576) {
        return error('图片大小必须小于1M');
      }
    }

    image = this.readFileSync(image);

    return Request.request(
      URIS.imagetranslate,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
        session_id: session_id,
        scene: scene,
        source: source,
        target: target,
      }),
    );
  }

  /**
   * 语音翻译
   *
   * 识别出音频中的文字，并进行翻译
   *
   * @see https://ai.qq.com/doc/speechtranslate.shtml
   * @param {int} format 默认MP3-8 AMR  3/SILK  4/PCM  6/MP3  8/AAC  9
   * @param {int} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @param {int} end 默认1  0  中间分片/1  结束分片
   * @param {string} session_id   非空且长度上限64B
   * @param {string} speech_chunk 语音分片数据的Base64编码，非空且长度上限8MB
   * @param {string} source 默认auto 中文  zh / 英文  en/ 日文  jp /韩文  kr / 自动识别（中英互译）  auto
   * @param {string} target 默认auto  en=>  zh / zh=>  en, jp, kr / jp=>zh / kr=> zh
   *
   * @return {Promise} A Promise Object
   */
  speechtranslate(
    speech_chunk: string,
    session_id: string,
    format: number = 8,
    seq: number = 0,
    end: number = 1,
    source: string = 'auto',
    target: string = 'auto',
  ): Promise<TencentAIReturn> {
    speech_chunk = this.readFileSync(speech_chunk);

    return Request.request(
      URIS.speechtranslate,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        format: format,
        seq: seq,
        end: end,
        session_id: session_id,
        speech_chunk: speech_chunk,
        source: source,
        target: target,
      }),
    );
  }

  /**
   * 语种识别
   *
   * 识别给出文本的语种
   *
   * @see https://ai.qq.com/doc/textdetect.shtml
   * @param {String} text  UTF-8编码，非空且长度上限1024字节
   * @param {String} candidate_langs  语言缩写，多种语言间用“|“ 分割
   * 中文  zh \ 英文  en \ 日文  jp \ 韩文  kr
   * @param {int} force 是否强制从候选语言中选择（只对二选一有效）
   *
   * @return {Promise} A Promise Object
   */
  textdetect(
    text: string,
    candidate_langs: string = 'zh|en|kr|jp',
    force: 0 | 1 = 0,
  ): any {
    if (!this.isWx) {
      if (!text || Buffer.byteLength(text, 'utf8') > 1024) {
        return error('text不能为空 或者应小于 1024B');
      }
    }

    return Request.request(
      URIS.textdetect,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        candidate_langs: candidate_langs,
        force: force,
      }),
    );
  }
}
