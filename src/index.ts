import './utils/_register';

import yargs = require('yargs');

process.env.ALLERIA_NAME = 'alleria';
['SIGINT', 'SIGTERM'].forEach((sig: 'SIGTERM' | 'SIGINT') => {
  process.on(sig, () => {
    process.exit();
  });
});

yargs
  .commandDir('cmds', {
    recurse: true,
  })
  .demandCommand()
  .help()
  .parse();
