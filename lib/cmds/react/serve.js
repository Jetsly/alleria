"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackDevServerUtils_1 = require("react-dev-utils/WebpackDevServerUtils");
const chalk_1 = require("chalk");
const webpack_1 = require("../../config/webpack");
const printServAddress_1 = require("../../utils/printServAddress");
const configify_1 = require("../../utils/configify");
const paths_1 = require("../../utils/paths");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const onErrors = (severity, errors) => {
    errors
        .filter(err => err.module === undefined &&
        err.file === undefined &&
        err.name === undefined &&
        err.message === undefined)
        .forEach(err => process.stdout.write(err.webpackError));
    if (severity === 'error') {
        const moduleNot = errors
            .filter(err => err.module === undefined &&
            err.type === 'module-not-found' &&
            err.webpackError.dependencies &&
            err.webpackError.dependencies.length &&
            err.webpackError.dependencies[0].options)
            .map(err => (Object.assign({}, err, { module: err.webpackError.dependencies[0].options.request })));
        if (moduleNot.length) {
            process.stdout.write(`This relative module was not found:\n\n`);
            moduleNot.forEach(err => process.stdout.write(`* ${err.module} in ${err.file}\n\n`));
        }
    }
};
function createServer(host, port) {
    const messages = [
        [
            chalk_1.default.green(`Serving your ${process.env.ALLERIA_NAME} project`),
            printServAddress_1.default(port),
            '',
        ].join('\n'),
    ];
    const _a = configify_1.default(process.env.ALLERIA_NAME) || {
        chainWebpack: () => { },
    }, { chainWebpack } = _a, alleriaConfig = __rest(_a, ["chainWebpack"]);
    const webpackConfig = webpack_1.default('development');
    (chainWebpack || (() => { }))(webpackConfig);
    webpackConfig
        .plugin('friendly-errors')
        .use(friendlyErrorsWebpackPlugin, [
        {
            compilationSuccessInfo: {
                messages,
            },
            onErrors,
        },
    ])
        .end();
    const hasFriendError = webpackConfig.plugins.has('friendly-errors');
    // const publicPath = webpackConfig.output.get('publicPath');
    const compiler = webpack(webpackConfig.toConfig());
    const server = new WebpackDevServer(compiler, Object.assign({ publicPath: compiler.options.output.publicPath, compress: true, historyApiFallback: true, hot: true, contentBase: paths_1.default.appPublic, quiet: hasFriendError }, alleriaConfig));
    // const app = express();
    // app.use(compress());
    // app.use(
    //   historyApiFallback({
    //     index: join(publicPath, '/index.html'),
    //   })
    // );
    // Object.keys(alleriaConfig.proxy || {}).forEach(prefix => {
    //   const { target, ...rest } = alleriaConfig.proxy[prefix];
    //   app.use(
    //     prefix,
    //     httpProxyMiddleware(prefix, {
    //       target,
    //       changeOrigin: true,
    //       secure: false,
    //       ...rest,
    //     })
    //   );
    // });
    // const instance = devMiddleware(compiler, {
    //   publicPath: compiler.options.output.publicPath,
    //   logLevel: hasFriendError ? 'silent' : 'info',
    // });
    // app.use(instance);
    // app.use(
    //   hotMiddleware(compiler, {
    //     log: false,
    //   })
    // );
    // app.use(express.static(paths.appPublic));
    return server.listen(port, host);
}
exports.command = 'react-serve';
exports.desc = 'develop react project';
exports.builder = {
    host: {
        default: '0.0.0.0',
    },
    port: {
        default: 8080,
    },
};
exports.handler = function serveReact(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!checkRequiredFiles([paths_1.default.appHtml, paths_1.default.appIndexJs])) {
            process.exit(1);
        }
        const { host, port } = argv;
        const newPort = yield WebpackDevServerUtils_1.choosePort(host, port);
        // require('../../tmp/index');
        createServer(host, newPort);
    });
};
