'use strict';

const { APP, fsReadSync } = require('./util');

const { Person } = require('../');

const person = new Person(APP.appkey, APP.appid);

const assert = require('assert');

/**
 * 人体管理API 测试类
 */
describe('person', function() {
  this.retries(4);

  let group_ids = 'group100';
  let person_id = '1504533187';
  let face_id;

  // 个体创建
  it('newperson', () => {
    return person
      .newperson({
        image: fsReadSync(`${__dirname}/resource/face/wxc.jpg`),
        person_name: '王小二',
        group_ids: group_ids,
        person_id: person_id,
        tag: '备注信息',
      })
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
          face_id = res.data.face_id;
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 增加人脸
  it('addface', function() {
    return person
      .addface(
        fsReadSync(`${__dirname}/resource/face/wxc2.jpg`),
        person_id,
        '备注信息',
      )
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 获取组列表
  it('getgroupids', function() {
    return person.getgroupids().then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 获取个体列表
  it('getpersonids', () => {
    return person.getpersonids(group_ids).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 获取人脸列表
  it('getfaceids', function() {
    return person.getfaceids(person_id).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 获取人脸信息
  it('getfaceinfo', function() {
    return person.getfaceinfo(face_id).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 获取信息
  it('getinfo', function() {
    return person.getinfo(person_id).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 设置信息
  it('setinfo', function() {
    return person.setinfo(person_id, 'wxc', '新的备注信息').then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 人脸识别
  it('faceidentify', () => {
    return person
      .faceidentify(
        fsReadSync(`${__dirname}/resource/face/wxc5.jpg`),
        'group1',
        9,
      )
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 人脸验证
  it('faceverify', () => {
    return person
      .faceverify(fsReadSync(`${__dirname}/resource/face/wxc3.jpg`), person_id)
      .then(
        res => {
          assert.strictEqual(res.ret, 0);
        },
        e => {
          assert.strictEqual(e.ret, 0);
        },
      );
  });

  // 删除人脸
  it('delface', () => {
    return person.delface(person_id, face_id).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });

  // 删除个体
  it('deleteperson', () => {
    return person.delperson(person_id).then(
      res => {
        assert.strictEqual(res.ret, 0);
      },
      e => {
        assert.strictEqual(e.ret, 0);
      },
    );
  });
});
