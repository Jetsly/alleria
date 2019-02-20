"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var configify_1 = require("../../utils/configify");
var requireDir = require("require-dir");
var Config = require("webpack-chain");
var resolveCwd = require("resolve-cwd");
function configProdBase(config) {
    var filename = '[name].[contenthash]';
    config.devtool(configify_1.shouldUseSourceMap ? 'source-map' : false);
    config.output.chunkFilename("js/" + filename + ".js");
    config.output.filename("js/" + filename + ".js");
    config.output.hashDigestLength(8);
    config.plugin('mini-css').use(require('mini-css-extract-plugin'), [
        {
            filename: "css/" + filename + ".css",
            chunkFilename: "css/" + filename + ".css",
        },
    ]);
}
function configBase(config) {
    config.when(process.env.NODE_ENV === 'production', configProdBase, function () {
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
    var config = new Config();
    config.mode(mode);
    configBase(config);
    var dirConfig = requireDir('./', {
        recurse: true,
        extensions: ['.js', '.ts'],
    });
    Object.keys(dirConfig).forEach(function (folder) {
        var files = dirConfig[folder];
        Object.keys(files).forEach(function (file) {
            return configify_1.loaderDefault(files[file])(config);
        });
    });
    return config;
}
exports.default = webpackConfig;
