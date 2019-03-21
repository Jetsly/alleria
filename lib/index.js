"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./utils/_register");
const yargs = require("yargs");
process.env.ALLERIA_NAME = 'alleria';
['SIGINT', 'SIGTERM'].forEach((sig) => {
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
