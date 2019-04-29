import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

function getConfig(target = 'min') {
  let config = {
    min: {
      output: {
        file: 'dist/tencent-ai.min.js',
        name: 'TencentAI',
        format: 'iife',
      },
      plugins: [
        typescript(),
        terser(),
        nodeResolve({
          mainFields: ['module', 'main'],
        }),
        commonjs({
          include: 'node_modules/**',
        }),
      ],
    },
    cjs: {
      output: {
        file: 'dist/tencent-ai.js',
        name: 'TencentAI',
        format: 'cjs',
      },
      plugins: [
        typescript(),
        nodeResolve({
          mainFields: ['module', 'main'],
        }),
        commonjs({
          include: 'node_modules/**',
        }),
      ],
    },
    esm: {
      output: {
        file: 'dist/tencent-ai.esm.js',
        name: 'TencentAI',
        format: 'esm',
      },
      plugins: [
        typescript(),
        nodeResolve({
          mainFields: ['module', 'main'],
        }),
        commonjs({
          include: 'node_modules/**',
        }),
      ],
    },
  };

  return config[target];
}

let config = {
  input: 'src/TencentAI.ts',
  output: {
    file: 'dist/tencent-ai.min.js',
    name: 'TencentAI',
    format: 'iife', // cjs es
  },
  plugins: [typescript(), terser()],
};

let { output, plugins } = getConfig(process.env.target);

config.output = output;
config.plugins = plugins;

export default config;
