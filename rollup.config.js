import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs'; // 将非 ES6 语法的包转为 ES6 可用
import nodeResolve from 'rollup-plugin-node-resolve'; // 帮助寻找 node_modules 里的包
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins'; // 打包 node 内置模块，使用浏览器兼容的 js 实现 node 内置模块
import globals from 'rollup-plugin-node-globals';
// import inject from 'rollup-plugin-inject';
import replace from './scripts/rollup-plugin-replace';
// import replace from 'rollup-plugin-replace';

let production = (process.env.NODE_ENV || 'development') === 'production';
let isDeno = process.env.target === 'deno';
let isWx = process.env.target === 'miniprogram';
let isUmd = ['umd', 'umd_min'].includes(process.env.target);
let isNode = ['cjs', 'cjs_min', 'esm'].includes(process.env.target);
let isBrowser = process.env.target === 'browser';

function getConfig(target = 'min') {
  let config = {
    umd_min: {
      output: {
        file: 'dist/tencent-ai.min.js',
        name: 'TencentAI',
        format: 'umd',
        exports: 'named',
      },
    },
    umd: {
      output: {
        file: 'dist/tencent-ai.js',
        name: 'TencentAI',
        format: 'umd',
        exports: 'named',
        sourcemap: 'inline',
      },
    },
    cjs: {
      output: {
        file: 'dist/tencent-ai.common.dev.js',
        format: 'cjs',
        exports: 'named',
        // sourcemap: 'inline',
      },
    },
    cjs_min: {
      output: {
        file: 'dist/tencent-ai.common.prod.js',
        format: 'cjs',
        exports: 'named',
        // sourcemap: 'inline',
      },
    },
    esm: {
      output: {
        file: 'dist/tencent-ai.mjs',
        format: 'esm',
        // sourcemap: 'inline',
      },
    },
  };

  if (target === 'miniprogram') {
    config = config['cjs_min'];
    config.output.file = 'miniprogram/index.js';

    return config;
  }

  if (isDeno) {
    config = config['esm'];
    config.output.file = 'dist/mod.js';

    return config;
  }

  if (target === 'browser') {
    config = config['esm'];
    config.output.file = 'dist/tencent-ai.browser.js';
    return config;
  }

  return config[target];
}

let config = {
  input: 'src/TencentAI.ts',
  output: {
    file: 'dist/tencent-ai.min.js',
    name: 'TencentAI',
    format: 'iife', // amd, cjs, esm, iife, umd
  },
  plugins: [
    typescript(),
    json({
      compact: true,
    }),
    isWx && replace(),
    // replace({}),
    // inject({
    // 某变量由哪个包提供
    // iswx 由 ws-fetch 包提供
    // isNode 由 node-fetch 包提供
    // 其他 runtime isDeno isBrowser 原生支持 fetch
    // wx_fetch: isWx ? 'wx-fetch' : 'node-fetch',
    // node_fetch: isWx ? 'wx-fetch' : 'node-fetch',
    // }),
    nodeResolve({
      mainFields: ['module', 'main'],
      preferBuiltins: true,
      // preferBuiltins: isDeno ? true : false,
      browser: isDeno || isWx || isBrowser || isUmd ? true : false,
    }),
    (isDeno || isWx || isBrowser || isUmd) && globals(),
    (isDeno || isWx || isBrowser || isUmd) && builtins(),
    commonjs({
      include: 'node_modules/**',
    }),
    production && terser(),
  ],

  external: function(id) {
    if (/^http\S/g.test(id)) {
      return true;
    }

    // node-fetch: node 中为外部模块，其他通过 browser 导入
    // wx-fetch: wx 中为外部模块,其他通过 browser 导入
    if (id === 'node-fetch' && isNode) {
      return true;
    }

    if (id === 'wx-fetch' && isWx) {
      return true;
    }

    if (['os', 'fs'].includes(id) && isNode) {
      return true;
    }

    return false;
  },
};

let { output } = getConfig(process.env.target);

output.banner = !production
  ? `
/*
 *
 * Tencent AI JS SDK.
 *
 * Official Website:  https://ai.qq.com
 * GitHub:            https://github.com/khs1994/tencent-ai-js
 * Author:            khs1994@hs1994.com
 *
 */
`
  : null;

config.output = output;

export default config;
