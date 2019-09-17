const { env } = Deno;

const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: env().NODE_TENCENT_AI_APP_KEY,
  appid: env().NODE_TENCENT_AI_APP_ID,
};

const ttformat = {
  '1': 'pcm',
  '2': 'wav',
  '3': 'mp3',
};

export { APP, ttformat };
