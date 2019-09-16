type gbkType = {
  encode:(str:string)=>number[],
  decode:(arr:number[])=>string,
  URI: {
    encodeURI:(str:string)=>string,
    decodeURI:(str:string)=>string,
    encodeURIComponent:(str:string)=>string,
    decodeURIComponent:(str:string)=>string,
  }
}

import URI from './URI';
import GBK from './gbk';

export default function (gbk_us:any) {
  // @ts-ignore
  let gbk:gbkType = GBK(gbk_us);

  gbk.URI = URI(gbk);

  return gbk;
};
