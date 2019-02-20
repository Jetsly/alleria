"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lessRegex = /\.(le|c)ss$/i;
function applyCssRule(cssRule, isModule) {
    if (isModule === void 0) { isModule = false; }
    var isProd = process.env.NODE_ENV === 'production';
    cssRule.when(!isProd && !isModule, function () {
        cssRule.use('css-hot-loader').loader(require.resolve('css-hot-loader'));
    });
    cssRule
        .use('extract-css-loader')
        .loader(require('mini-css-extract-plugin').loader);
    cssRule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({
        importLoaders: 2,
        modules: !isModule,
        getLocalIdent: require('react-dev-utils/getCSSModuleLocalIdent'),
    });
    cssRule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({
        plugins: function () { return [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                flexbox: 'no-2009',
            }),
        ]; },
    });
    cssRule
        .use('less-loader')
        .loader(require.resolve('less-loader'))
        .options({
        javascriptEnabled: true,
    });
}
function loaderConfig(config) {
    applyCssRule(config.module
        .rule('rule-src-css')
        .test(lessRegex)
        .exclude.add(/node_modules/)
        .end());
    applyCssRule(config.module
        .rule('rule-module-css')
        .test(lessRegex)
        .include.add(/node_modules/)
        .end(), true);
}
exports.default = loaderConfig;
