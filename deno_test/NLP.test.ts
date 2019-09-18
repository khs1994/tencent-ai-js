import { test, runIfMain } from 'https://deno.land/std/testing/mod.ts';
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts';
import { NLP } from '../dist/mod.js';
import { APP } from './util.ts';
const nlp = new NLP(APP.appkey, APP.appid);

test(async function seg() {
  let res = await nlp.seg('你好');

  assertStrictEq(res.ret, 0);
});
