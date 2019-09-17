export default function(): string {
  const os = require('os');
  const fs = require('fs');
  let random: any = Date.now() * Math.round(Math.random() * 10);

  let dir: string = `/tmp/tencent_ai`;

  if (os.platform() === 'win32') {
    dir = `${process.env.TMP}/tencent_ai`;
  }

  try {
    fs.mkdirSync(dir);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw new Error('create cache folder error');
    }
  }

  return `${dir}/${random}`;
}
