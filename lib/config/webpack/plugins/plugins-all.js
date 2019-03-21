"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
const find_up_1 = require("find-up");
const configify_1 = require("../../../utils/configify");
function loaderConfig(config) {
    config.plugin('webpackbar').use(require('webpackbar'));
    config
        .plugin('webpack-filter-warnings')
        .use(require('webpack-filter-warnings-plugin'), [
        {
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        },
    ]);
    config
        .plugin('ignore-moment-locale')
        .use(require('webpack/lib/IgnorePlugin'), [/^\.\/locale$/, /moment$/]);
    config.resolve
        .plugin('tsconfig-paths')
        .use(require('tsconfig-paths-webpack-plugin'), [
        {
            configFile: find_up_1.sync('tsconfig.json'),
        },
    ]);
    config.plugin('define-config-env').use(webpack_1.DefinePlugin, [configify_1.loadEnvYaml()]);
    config
        .plugin('hard-source-webpack')
        .use(require('hard-source-webpack-plugin'), [
        {
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['yarn.lock', '.env.yml', '.env.yaml'],
            },
        },
    ]);
}
exports.default = loaderConfig;
