export default function readFileSync(image) {
  const fs = wx.getFileSystemManager();

  if (!image) {
    return image;
  }

  return fs.readFileSync(image, 'base64');
}

export function readFile(image) {
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
