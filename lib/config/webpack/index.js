"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
const configify_1 = require("../../utils/configify");
const requireDir = require("require-dir");
const Config = require("webpack-chain");
const resolveCwd = require("resolve-cwd");
function configProdBase(config) {
    const filename = '[name].[contenthash]';
    config.devtool(configify_1.shouldUseSourceMap ? 'source-map' : false);
    config.output.chunkFilename(`js/${filename}.js`);
    config.output.filename(`js/${filename}.js`);
    config.output.hashDigestLength(8);
    config.plugin('mini-css').use(require('mini-css-extract-plugin'), [
        {
            filename: `css/${filename}.css`,
            chunkFilename: `css/${filename}.css`,
        },
    ]);
}
function configBase(config) {
    config.when(process.env.NODE_ENV === 'production', configProdBase, () => {
        config.devtool('cheap-module-source-map');
        config.plugin('hot-module').use(webpack_1.HotModuleReplacementPlugin);
        config.plugin('mini-css').use(require('mini-css-extract-plugin'));
        if (resolveCwd.silent('@hot-loader/react-dom')) {
            config.resolve.alias.set('react-dom', '@hot-loader/react-dom');
        }
    });
}
function webpackConfig(mode) {
    process.env.NODE_ENV = mode;
    const config = new Config();
    config.mode(mode);
    configBase(config);
    const dirConfig = requireDir('./', {
        recurse: true,
        extensions: ['.js', '.ts'],
    });
    Object.keys(dirConfig).forEach(folder => {
        const files = dirConfig[folder];
        Object.keys(files).forEach(file => configify_1.loaderDefault(files[file])(config));
    });
    return config;
}
exports.default = webpackConfig;
