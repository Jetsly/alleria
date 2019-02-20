"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loaderConfig(config) {
    config.module.rule('mjs').test(/\.mjs$/).type('javascript/auto');
    config.module
        .rule('compile-mjs')
        .test(/\.mjs$/i)
        // .use('cache-loader')
        // .loader(require.resolve('cache-loader'))
        // .end()
        .use('ts-loader')
        .loader(require.resolve('ts-loader'))
        .options({
        transpileOnly: true,
    });
}
exports.default = loaderConfig;
