const process = require('process');

module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  // https://stackoverflow.com/questions/38296761/how-to-support-es7-in-eslint
  // http://www.php.cn/js-tutorial-386185.html
  // 为了让eslint支持es7或更高的语法
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'prettier'],
  // "extends": ["plugin:prettier/recommended"]
  parserOptions: {
    // 'ecmaVersion': 2015,
    ecmaVersion: 7,
    impliedStrict: true,
    sourceType: 'script',
  },
  // https://cn.eslint.org/docs/rules/
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        FunctionDeclaration: {
          parameters: 2,
          body: 1,
        },
        ObjectExpression: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 2,
    strict: 2,
    // 'valid-jsdoc': 'error',
    // https://eslint.org/docs/user-guide/configuring#using-configuration-files
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
  plugins: [],
};
