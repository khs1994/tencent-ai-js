module.exports = {
  root: true,
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  // https://stackoverflow.com/questions/38296761/how-to-support-es7-in-eslint
  // http://www.php.cn/js-tutorial-386185.html
  // 为了让 eslint 支持 es7 或更高的语法
  // https://eslint.org/docs/user-guide/configuring#specifying-parser
  // parser: 'babel-eslint',
  parser: '@typescript-eslint/parser',
  // https://eslint.org/docs/user-guide/configuring#extending-configuration-files
  extends: [
    'eslint:recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    // https://github.com/mysticatea/eslint-plugin-node
    // 'plugin:node/recommended',
    // "plugin:promise/recommended",
  ],
  // "extends": ["plugin:prettier/recommended"]
  // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    // 'ecmaVersion': 2015,
    ecmaVersion: 2019,
    impliedStrict: true,
    sourceType: 'module',
  },
  // https://cn.eslint.org/docs/rules/
  // https://eslint.org/docs/user-guide/configuring#configuring-rules
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
    // 禁止抛出字面量错误 throw "error";
    'no-throw-literal': 2,

    // 'valid-jsdoc': 'error',

    // https://eslint.org/docs/user-guide/configuring#using-configuration-files
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    strict: 2,
    'no-console': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 'node/exports-style': ['error', 'module.exports'],
    // 'node/prefer-global/process': ['error', 'always'],

    'prettier/prettier': ['error', { trailingComma: 'all' }],
  },
  // https://eslint.org/docs/user-guide/configuring#configuring-plugins
  plugins: ['@typescript-eslint'],
};
