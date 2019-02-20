"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_up_1 = require("find-up");
var path_1 = require("path");
function loaderConfig(config) {
    config.module
        .rule('compile-ts')
        .test(/\.(tsx|ts)$/i)
        .exclude.add(/node_modules/)
        .end()
        .use('cache-loader')
        .loader(require.resolve('cache-loader'))
        .end()
        .use('ts-loader')
        .loader(require.resolve('ts-loader'))
        .options({
        transpileOnly: true,
        happyPackMode: true,
        compilerOptions: {
            module: 'es2015',
        },
        getCustomTransformers: path_1.join(__dirname, '../../../transformer/ts-transformers.js'),
    })
        .end();
    config
        .plugin('fork-ts-checker')
        .use(require('fork-ts-checker-webpack-plugin'), [
        {
            tsconfig: find_up_1.sync('tsconfig.json'),
            checkSyntacticErrors: true,
            formatter: 'codeframe',
        },
    ]);
}
exports.default = loaderConfig;
