module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  // "extends": ["plugin:prettier/recommended"]
  'parserOptions': {
    'ecmaVersion': 2015,
    'impliedStrict': true,
    'sourceType': 'script',
  },
  // https://cn.eslint.org/docs/rules/
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'FunctionDeclaration': {
          'parameters': 2,
          'body': 1,
        },
        'ObjectExpression': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-console': 2,
    'strict': 2,
    // 'valid-jsdoc': 'error',
  },
  'plugins': [],
};
