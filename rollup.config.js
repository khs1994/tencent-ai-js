import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

let production = (process.env.target || 'min') === 'min';

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
        file: 'dist/tencent-ai.common.js',
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
