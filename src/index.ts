import './utils/_register';

import yargs = require('yargs');
process.chdir(process.cwd());
process.env.ALLERIA_NAME = 'alleria';
yargs
  .commandDir('cmds', {
    recurse: true,
  })
  .demandCommand()
  .help()
  .parse();
