import TencentAI from '../src/TencentAI';
import { APP } from './util';

const tencentAI = new TencentAI(APP.appkey, APP.appid);

tencentAI.nlp.textChat('hello ai', '1').then(res => console.log(res));
