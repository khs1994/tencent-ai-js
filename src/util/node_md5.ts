const crypto = require('crypto');

export default function md5(str) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
}
