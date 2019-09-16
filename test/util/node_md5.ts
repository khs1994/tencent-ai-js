import * as crypto from 'crypto';

export default function(str: string): string {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
}
