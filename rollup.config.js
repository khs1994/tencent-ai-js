import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

function getConfig(target = 'min') {
  let config = {
    min: {
      output: {
        file: 'dist/tencent-ai.min.js',
        name: 'TencentAI',
        format: 'iife',
      },
      plugins: [typescript(), terser()],
    },
    cjs: {
      output: {
        file: 'dist/tencent-ai.js',
        name: 'TencentAI',
        format: 'cjs',
      },
      plugins: [typescript()],
    },
    esm: {
      output: {
        file: 'dist/tencent-ai.esm.js',
        name: 'TencentAI',
        format: 'esm',
      },
      plugins: [typescript()],
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
