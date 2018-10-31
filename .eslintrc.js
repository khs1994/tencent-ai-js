module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2015,
    'impliedStrict': true,
    'sourceType': 'script',
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': 2,
    'strict': 2
  },
  'plugins': []
};
