const fs = require('fs');

fs.copyFileSync(
  'scripts/tencent-ai.common.js',
  'dist/tencent-ai.common.js',
  () => {},
);
