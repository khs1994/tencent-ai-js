export default function readFileSync(image: string) {
  const fs = wx.getFileSystemManager();
  // 编码 直接返回

  // url 由于小程序限制，不进行处理

  // 文件 读取后返回
  try {
    fs.accessSync(image);
    // 文件存在
    return fs.readFileSync(image, 'base64');
  } catch (e) {
    // 文件不存在，直接返回
    return image;
  }
}

export function readFile(image: string) {
  const fs = wx.getFileSystemManager();

  return new Promise((resolve, reject) => {
    try {
      fs.readFile({
        filePath: image,
        encoding: 'base64',
        success(res) {
          resolve(res.data);
        },
        fail(e) {
          reject(e);
        },
      });
    } catch (e) {
      reject(e);
    }
  });
}
