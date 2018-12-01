export default function gbk(gbk_us: any) {
  let gbk = require('./gbk')(gbk_us);
  gbk.URI = require('./URI')(gbk);
  return gbk;
};
