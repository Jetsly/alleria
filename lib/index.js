"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./utils/_register");
var yargs = require("yargs");
process.chdir(process.cwd());
process.env.ALLERIA_NAME = 'alleria';
yargs
    .commandDir('cmds', {
    recurse: true,
})
    .demandCommand()
    .help()
    .parse();
