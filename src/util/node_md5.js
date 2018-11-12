'use strict';

const crypto = require('crypto');

module.exports = {
  md5(str) {
    return crypto
      .createHash('md5')
      .update(str, 'utf8')
      .digest('hex');
  },
};
