"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var configify_1 = require("../../../utils/configify");
var paths_1 = require("../../../utils/paths");
function loaderConfig(config) {
    config.plugin('html-webpack').use(require('html-webpack-plugin'), [
        {
            template: paths_1.default.appHtml,
        },
    ]);
    config.optimization.splitChunks({
        minSize: 3000,
        cacheGroups: {
            vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
            },
            index: {
                // when name same as entry name is error
                // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257
                name: 'main',
                test: /\.less$/,
                chunks: 'all',
                enforce: true,
            },
        },
    });
    config.when(process.env.NODE_ENV === 'production', function () {
        config.plugin('hash-module').use(webpack_1.HashedModuleIdsPlugin);
        config.optimization.minimize(true);
        config.optimization
            .minimizer('css-minimizer')
            .use(require('optimize-css-assets-webpack-plugin'))
            .end();
        config.optimization
            .minimizer('js-minimizer')
            .use(require('terser-webpack-plugin'), [
            {
                cache: true,
                parallel: true,
                sourceMap: configify_1.shouldUseSourceMap,
            },
        ])
            .end();
    });
}
exports.default = loaderConfig;
