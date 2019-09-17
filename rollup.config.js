import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs'; // 将非 ES6 语法的包转为 ES6 可用
import nodeResolve from 'rollup-plugin-node-resolve'; // 帮助寻找 node_modules 里的包
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins'; // 打包 node 内置模块，浏览器兼容的 js 实现 node 内置模块
import globals from 'rollup-plugin-node-globals';

let production = (process.env.NODE_ENV || 'development') === 'production';
let isDeno = process.env.target === 'deno';
let isWx = process.env.target === 'miniprogram';
let isUmd = process.env.target === 'min' || process.env.target === 'umd';
// let isNode = true;
let isBrowser = process.env.target === 'browser';

function getConfig(target = 'min') {
  let config = {
    min: {
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
        // sourcemap: 'inline',
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
    production && terser(),
    nodeResolve({
      mainFields: ['module', 'main'],
      preferBuiltins: true,
      // preferBuiltins: isDeno ? true : false,
      browser: isDeno || isWx || isBrowser || isUmd ? true : false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    json({
      compact: true,
    }),
    // isDeno && ''
    (isDeno || isWx || isBrowser || isUmd) && globals(),
    (isDeno || isWx || isBrowser || isUmd) && builtins(),
  ],
  // externals: builtins,
  external: [isWx && 'wx-fetch'],
};

let { output } = getConfig(process.env.target);

config.output = output;

export default config;
