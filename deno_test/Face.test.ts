import { test, runIfMain } from 'https://deno.land/std/testing/mod.ts';
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts';
import { Face } from '../dist/mod.js';
import { APP } from './util.ts';
import readFileDenoHandler from '../src/util/fs/readFileDenoHandler.ts';
const face = new Face(APP.appkey, APP.appid);

test(async function detectface_file() {
  let file = `${Deno.cwd()}/../test/resource/face/wxc.jpg`;
  let r = await face.detect(file, 0);

  assertStrictEq(r.ret, 0);
});

test(async function detectface_base64() {
  let base64 = await readFileDenoHandler(
    `${Deno.cwd()}/../test/resource/face/wxc.jpg`,
  );
  let r = await face.detect(base64, 0);

  assertStrictEq(r.ret, 0);
});

test(async function detectface_url() {
  // let url = '';
  // let r = await face.detect(url, 0);

  assertStrictEq(0, 0);
});
