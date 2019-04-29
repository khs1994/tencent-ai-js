import URI from './URI';
import GBK from './gbk';

export default function gbk(gbk_us: any) {
  let gbk = GBK(gbk_us);
  // @ts-ignore
  gbk.URI = URI(gbk);
  return gbk;
};
