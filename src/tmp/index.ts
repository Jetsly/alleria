import { loaderDefault } from '../utils/configify';

import requireDir = require('require-dir');
function loadTmpHanlder() {
  const dirConfig = requireDir('./', {
    extensions: ['.js', '.ts'],
  });
  Object.keys(dirConfig).forEach(folder => {
    loaderDefault(dirConfig[folder])();
  });
}

loadTmpHanlder();
