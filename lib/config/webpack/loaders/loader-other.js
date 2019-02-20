"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleify_1 = require("../../../utils/moduleify");
const resolveCwd = require("resolve-cwd");
const DEFAULT_INLINE_LIMIT = 10000;
function loaderConfig(config) {
    //   config.module
    //     .rule('eslint-loader')
    //     .test(/\.tsx?$/i)
    //     .enforce('pre')
    //     .use('eslint-loader')
    //     .loader(require.resolve('eslint-loader'))
    //     .end();
    moduleify_1.conditionModule('graphql-tag', () => {
        config.module
            .rule('compile-graphql')
            .test(/\.(graphql|gql)$/i)
            .exclude.add(/node_modules/)
            .end()
            .use('graphql-loader')
            .loader(resolveCwd.silent('graphql-tag/loader'));
    });
    config.module
        .rule('compile-url')
        .test(/\.(png|jpe?g|gif|svg)$/i)
        .exclude.add(/node_modules/)
        .end()
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
        limit: DEFAULT_INLINE_LIMIT,
        name: 'images/[name].[hash:8].[ext]',
    });
}
exports.default = loaderConfig;
