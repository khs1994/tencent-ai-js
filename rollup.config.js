import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

let production = (process.env.NODE_ENV || 'development') === 'production';

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
        file: 'dist/tencent-ai.esm.js',
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
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};

let { output } = getConfig(process.env.target);

config.output = output;

export default config;
