import AbstractTencentAI from './AbstractTencentAI';
import Request from './client/Request';
import { URIS, commonParams, error } from './util/util';
import TencentAIResult from './TencentAIResult';

export default class Speech extends AbstractTencentAI {
  /**
   * 智能语音 API 服务类
   *
   * @method tts(Object) 语音合成（AI Lab）
   * @method tta(Object) 语音合成（优图）
   * @method asr(Object) 语音识别-echo版
   * @method asrs(Object) 语音识别-流式版（AI Lab）
   * @method wxasrs(Object) 语音识别-流式版(WeChat AI)
   * @method wxasrlong(Object) 长语音识别
   */

  /**
   * 音频鉴黄
   *
   * 识别用户提供链接的音频，判断是否为色情音频。
   *
   * @see https://ai.qq.com/doc/aaievilaudio.shtml
   * @param {string} speech_id 语音唯一标识 非空且长度上限64B，同一应用内每段语音流标识需唯一
   * @param {string} speech_url 音频URL，建议音频时长不超过3分钟 非空且长度上限512B
   *
   * @return {Promise}
   */
  evilaudio(speech_id: string, speech_url: string): Promise<TencentAIResult> {
    return Request(
      this.proxy,
      URIS.evilaudio,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech_id,
        speech_url,
      }),
    );
  }

  /**
   * 语音合成（AI Lab）
   *
   * 将文字转换为语音，返回文字的语音数据
   *
   * @see https://ai.qq.com/doc/aaitts.shtml
   * @param {String} text  待合成文本 UTF-8编码，非空且长度上限150字节
   * @param {Number} speaker 默认1 语音发音人编码，取值范围[普通话男声  1 | 静琪女声  5 | 欢馨女声  6 | 碧萱女声  7]
   * @param {Number} format 默认2  合成语音格式编码，取值范围[PCM  1 | WAV  2 | MP3  3]
   * @param {Number} volume 默认10dB 合成语音音量，取值范围[-10, 10]，
   * @param {Number} speed 默认100---- 合成语音语速，取值范围[50, 200]
   * @param {Number} aht 默认0---- 合成语音降低/升高半音个数，即改变音高，取值范围[-24, 24]
   * @param {Number} apc 默认58--- 控制频谱翘曲的程度，改变说话人的音色，取值范围[0, 100]
   *
   * @return {Promise} A Promise Object
   */
  tts(
    text: string,
    speaker: 1 | 5 | 6 | 7 = 1,
    format: 1 | 2 | 3 = 2,
    volume: number = 10,
    speed: number = 100,
    aht: number = 0,
    apc: number = 58,
  ): Promise<TencentAIResult> {
    return Request(
      this.proxy,
      URIS.tts,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        text,
        speaker,
        format,
        volume,
        speed,
        aht,
        apc,
      }),
    );
  }

  /**
   * 语音合成（优图）
   *
   * 将文字转换为语音，返回文字的语音数据
   *
   * @see https://ai.qq.com/doc/aaitts.shtml
   * @param {String} text 待合成语音文本 utf8格式，最大300字节
   * @param {Number} model_type 默认0--- 发音模型，取值范围[女生  0 | 女生纯英文  1 | 男生  2 | 喜道公子  6]
   * @param {Number} speed 默认0--- 合成语音语速，取值范围[0.6倍速  -2 | 0.8倍速  -1 | 正常速度  0 | 1.2倍速  1 | 1.5倍速  2]
   *
   * @return {Promise} A Promise Object
   */
  tta(text: string, model_type: 0 | 1 | 2 | 6 = 0, speed: number = 0): any {
    if (typeof Buffer !== 'undefined') {
      if (text && Buffer.byteLength(text, 'utf8') > 300) {
        return error('text不能为空 或者应小于 300B');
      }
    }

    return Request(
      this.proxy,
      URIS.tta,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        text,
        model_type,
        speed,
      }),
    );
  }

  /**
   * 语音识别 echo 版
   *
   * 接口提供在线识别语音的能力，识别完成后，将返回语音的文字内容。
   *
   * @see https://ai.qq.com/doc/aaiasr.shtml
   * @param {String} speech 待识别语音（时长上30s） 单声道，16bit采样位数，语音数据的Base64编码，非空且长度上限8MB
   * @param {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM  1 | WAV  2 | AMR  3 | SILK  4]
   * @param {Number} rate 默认8000--- 语音采样率编码，取值范围[8KHz  8000 | 16KHz  16000]
   *
   * @return {Promise} A Promise Object
   */
  async asr(
    speech: string,
    format: 1 | 2 | 3 | 4 = 2,
    rate: 8000 | 16000 = 8000,
  ): Promise<TencentAIResult> {
    speech = await this.readFileSync(speech);

    return Request(
      this.proxy,
      URIS.asr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech,
        format,
        rate,
      }),
    );
  }

  /**
   * 语音识别-流式版（AI Lab）
   *
   * 流式版接口提供在线流式识别语音的能力，可以快速获取边录音边识别的能力。
   *
   * @see https://ai.qq.com/doc/aaiasr.shtml
   * @param {String} speech_chunk 待识别语音 单声道，语音数据的Base64编码，非空且长度上限8MB
   * 分片规则[
   * PCM  支持按字节或者时间切片  |
   * WAV  支持按字节或者时间切片   |
   * AMR  仅支持按帧切片，第一个分片需包含AMR头标识（#!AMR\n），每个分片至少包含一个AMR帧，一个分片允许包含多个AMR帧   |
   * SILK  仅支持按帧切片，第一个分片需包含SILK头标识（#!SILK_V3），每个分片至少包含一个SILK帧，一个分片允许包含多个SILK帧]
   * @param {String} speech_id 语音唯一标识（同一应用内）
   * @param {Number} len 语音分片长度（字节）
   * @param {Number} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @param {Number} end 默认1 是否结束分片标识，取值范围[0  中间分片 | 1  结束分片]
   * @param {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM  1 | WAV  2 | AMR  3 | SILK  4]
   * @param {Number} rate 默认8000--- 语音采样率编码，取值范围[8KHz  8000 | 16KHz  16000]
   *
   * @return {Promise} A Promise Object
   */
  async asrs(
    speech_chunk: string,
    speech_id: string,
    len: number = 0,
    seq: number = 0,
    end: 0 | 1 = 1,
    format: 1 | 2 | 3 | 4 = 2,
    rate: 8000 | 16000 = 8000,
  ): Promise<TencentAIResult> {
    speech_chunk = await this.readFileSync(speech_chunk);

    return Request(
      this.proxy,
      URIS.asrs,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech_chunk,
        speech_id,
        len,
        seq,
        end,
        format,
        rate,
      }),
    );
  }

  /**
   * 语音识别-流式版(WeChat AI)
   *
   * 流式版接口提供在线流式识别语音的能力，可以快速获取边录音边识别的能力。
   * 为保证识别的流畅度，语音的分片时长建议200-300ms，单段语音的总时长上限为90s。
   *
   * @see https://ai.qq.com/doc/aaiasr.shtml
   * @param {String} speech_chunk 待识别语音 单声道，非空且时长上限90s，建议时长200-300ms，分片规则见下文描述
   * 分片规则[
   * PCM  支持按字节或者时间切片
   * WAV  支持按字节或者时间切片
   * AMR  支持按字节或者时间切片
   * SILK  支持按字节或者时间切片
   * SPEEX  支持按字节或者时间切片]
   * @param {String} speech_id 语音唯一标识（同一应用内）
   * @param {Number} len 语音分片长度（字节）
   * @param {Number} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @param {Number} end 默认1 是否结束分片标识，取值范围[0  中间分片 | 1  结束分片]
   * @param {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM  1 | WAV  2 | AMR  3 | SILK  4 | SPEEX  5]
   * @param {Number} rate 默认16000--- 语音采样率编码，取值范围[16KHz  16000]
   * @param {Number} bits 默认16位--- 音频采样位数
   * @param {Number} cont_res 默认0--- 是否获取中间识别结果，取值范围 [0  不获取 | 1  获取]
   *
   * @return {Promise} A Promise Object
   */
  async wxasrs(
    speech_chunk: string,
    speech_id: string,
    len: number = 0,
    seq: number = 0,
    end: 0 | 1 = 1,
    format: 1 | 2 | 3 | 4 | 5 = 2,
    rate: 8000 | 16000 = 16000,
    bits: number = 16,
    cont_res: 0 | 1 = 0,
  ) {
    speech_chunk = await this.readFileSync(speech_chunk);

    if (speech_chunk && speech_id && len) {
      return Request(
        this.proxy,
        URIS.wxasrs,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          speech_chunk,
          speech_id,
          len,
          seq,
          end,
          format,
          rate,
          bits,
          cont_res,
        }),
      );
    } else {
      return error('speech_chunk/speech_id 不能为空, len不能为0');
    }
  }

  /**
   * 长语音识别
   *
   * 长语音识别包含两个接口：语音上传接口，回调接口。用户调用语音上传接口上传语音，返回task_id，在识别完成后平台异步通知用户，返回识别结果。
   *
   * @see https://ai.qq.com/doc/wxasrlong.shtml
   * @param {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM  1 | WAV  2 | AMR  3 | SILK  4]
   * @param {String} callback_url 用户回调url，需用户提供，用于平台向用户通知识别结果
   * @param {String} speech 待识别语音（时长上限15min） 语音数据的Base64编码，原始音频大小上限5MB
   * @param {String} speech_url 待识别语音下载地址（时长上限15min） 音频下载地址，音频大小上限30MB
   *
   * @return {Promise} A Promise Object
   */
  async wxasrlong(
    format: 1 | 2 | 3 | 4 = 2,
    callback_url: string,
    speech: string = '',
    speech_url: string = '',
  ): Promise<TencentAIResult> {
    speech = await this.readFileSync(speech);

    return Request(
      this.proxy,
      URIS.wxasrlong,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech_url,
        speech,
        callback_url,
        format,
      }),
    );
  }

  /**
   * 关键词检索
   *
   * 上传长音频，提供回调接口，异步获取识别结果
   *
   * @see https://ai.qq.com/doc/detectword.shtml
   * @param format
   * @param callback_url 用户回调url，需用户提供，用于平台向用户通知识别结果
   * @param key_words 待识别关键词 非空，多个关键词之间用“|”分隔，每个词长度不低于两个字，上限500个词
   * @param speech 语音数据的Base64编码，原始音频大小上限5MB 待识别语音（时长上限15min）
   * @param speech_url 音频下载地址，音频大小上限30MB 待识别语音下载地址（时长上限15min）
   *
   * @return {Promise}
   */
  async detectkeyword(
    callback_url: string,
    key_words: string,
    format: number = 2,
    speech: string = '',
    speech_url: string = '',
  ) {
    speech = await this.readFileSync(speech);

    return Request(
      this.proxy,
      URIS.detectkeyword,
      this.appKey,
      Object.assign(
        {},
        commonParams(),
        {
          app_id: this.appId,
          callback_url,
          key_words,
          format,
        },
        speech ? { speech } : { speech_url },
      ),
    );
  }
}
