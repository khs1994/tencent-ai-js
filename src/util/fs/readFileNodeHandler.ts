import temp from './nodeTemp';
import * as fs from 'fs';
import node_fetch from 'node-fetch';

export default async function readFileNodeHandler(
  item: string,
  limit: number = 0,
): Promise<string> {
  let base64: string;
  let isFile: boolean = false;
  let isUrl: boolean = false;
  let file: string;

  try {
    fs.accessSync(item);
    isFile = true; // 本地路径
    file = item;
  } catch {
    if (/^http\S*[.jpg|.bmp|.png]$/g.test(item)) {
      // url
      // download file
      isUrl = true;

      file = await request(item);
    } else {
      // 编码 直接返回
      return item;
    }
  }

  // 是文件，转码
  base64 = fs.readFileSync(file, {
    encoding: 'base64',
  });

  if (isUrl) {
    fs.unlink(file, () => {});
  }

  if (typeof Buffer !== 'undefined' && limit) {
    if (Buffer.byteLength(base64, 'base64') >= 1048576) {
      // @ts-ignore
      return error('大小超出 1M');
    }
  }

  return base64;
}

async function request(url: string) {
  const file: string = temp();

  fs.writeFileSync(
    file,
    await node_fetch(url).then(res => {
      return res.buffer();
    }),
  );

  return file;
}
