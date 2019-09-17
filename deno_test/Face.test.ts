import { test, runIfMain } from 'https://deno.land/std/testing/mod.ts';
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts';
import { Face } from '../dist/mod.js';
import { APP } from './util.ts';

const face = new Face(APP.appkey, APP.appid);

test(async function detectface_file() {
  let file = `${Deno.cwd()}/../test/resource/face/wxc.jpg`;
  let r = await face.detect(file, 0);

  assertStrictEq(r.ret, 0);
});
