import { APP, fsReadSync } from './util';
import { Face } from '../src/TencentAI';
import * as assert from 'assert';

const face = new Face(APP.appkey, APP.appid);

/**
 * 面部识别API 测试类
 */
describe('face', function() {
  this.retries(4);
  // 人脸分析
  it('detectface_base64', async () => {
    let r = await face.detect(
      fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
      0,
    );

    assert.strictEqual(r.ret, 0);
  });

  it('detectface_file://', async () => {
    let r = await face.detect(`${__dirname}/resource/face/wxc.jpg`, 0);

    assert.strictEqual(r.ret, 0);
  });

  it('detectface_http(s)://', async () => {
    let url =
      'https://yyb.gtimg.com/aiplat/static/ai-demo/large/faceage-demo.jpg';
    let r = await face.detect(url, 0);

    assert.strictEqual(r.ret, 0);
  });

  // 人脸分析 大脸
  it('detectface_big', async function() {
    let r = await face.detect(`${__dirname}/resource/face/wxc2.jpg`, 1);

    assert.strictEqual(r.ret, 0);
  });

  // 多人脸检测
  it('detectmultiface', async function() {
    let r = await face.detectmulti(
      fsReadSync(`${__dirname}/resource/face/peterye2.jpg`),
    );

    assert.strictEqual(r.ret, 0);
  });

  // 人脸对比
  it('facecompare', async function() {
    let r = await face.compare(
      `${__dirname}/resource/face/wxc.jpg`,
      fsReadSync(`${__dirname}/resource/face/wxc2.jpg`),
    );

    assert.strictEqual(r.ret, 0);
  });

  // 五官定位
  it('faceshape', async function() {
    let r = await face.shape(
      fsReadSync(`${__dirname}/resource/face/wxc3.jpg`),
      0,
    );

    assert.strictEqual(r.ret, 0);
  });

  // 五官定位 大脸
  it('faceshape_big', async function() {
    let r = await face.shape(`${__dirname}/resource/face/wxc3.jpg`, 1);

    assert.strictEqual(r.ret, 0);
  });

  // 跨年龄人脸识别
  it('detectcrossageface', async function() {
    let r = await face.detectcrossage(
      fsReadSync(__dirname + '/resource/face/peterye1.jpg'),
      fsReadSync(__dirname + '/resource/face/peterye2.jpg'),
    );
    assert.strictEqual(r.ret, 0);
  });
});
