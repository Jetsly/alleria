"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var WebpackDevServerUtils_1 = require("react-dev-utils/WebpackDevServerUtils");
var chalk_1 = require("chalk");
var path_1 = require("path");
var webpack_1 = require("../../config/webpack");
var printServAddress_1 = require("../../utils/printServAddress");
var configify_1 = require("../../utils/configify");
var paths_1 = require("../../utils/paths");
var checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
var chokidar = require("chokidar");
var express = require("express");
var compress = require("compression");
var webpack = require("webpack");
var devMiddleware = require("webpack-dev-middleware");
var hotMiddleware = require("webpack-hot-middleware");
var historyApiFallback = require("connect-history-api-fallback");
var httpProxyMiddleware = require("http-proxy-middleware");
var friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var onErrors = function (severity, errors) {
    var unOutputError = errors.filter(function (err) {
        return err.module === undefined &&
            err.file === undefined &&
            err.name === undefined &&
            err.message === undefined;
    });
    if (unOutputError.length) {
        unOutputError.forEach(function (err) { return process.stdout.write(err.webpackError); });
    }
};
function createServer(host, port) {
    var messages = [
        [
            chalk_1.default.green("Serving your " + process.env.ALLERIA_NAME + " project"),
            printServAddress_1.default(port),
            '',
        ].join('\n'),
    ];
    var alleriaConfig = configify_1.default();
    var webpackConfig = webpack_1.default('development');
    (alleriaConfig.chainWebpack || (function () { }))(webpackConfig);
    Object.keys(webpackConfig.entryPoints.entries()).forEach(function (name) {
        webpackConfig.entry(name).add('webpack-hot-middleware/client');
    });
    webpackConfig
        .plugin('friendly-errors')
        .use(friendlyErrorsWebpackPlugin, [
        {
            compilationSuccessInfo: {
                messages: messages,
            },
            onErrors: onErrors,
        },
    ])
        .end();
    var hasFriendError = webpackConfig.plugins.has('friendly-errors');
    var publicPath = webpackConfig.output.get('publicPath');
    var app = express();
    app.use(compress());
    app.use(historyApiFallback({
        index: path_1.join(publicPath, '/index.html'),
    }));
    Object.keys(alleriaConfig.proxy || {}).forEach(function (prefix) {
        var _a = alleriaConfig.proxy[prefix], target = _a.target, rest = __rest(_a, ["target"]);
        app.use(prefix, httpProxyMiddleware(prefix, __assign({ target: target, changeOrigin: true, secure: false }, rest)));
    });
    var compiler = webpack(webpackConfig.toConfig());
    var instance = devMiddleware(compiler, {
        publicPath: compiler.options.output.publicPath,
        logLevel: hasFriendError ? 'silent' : 'info',
    });
    app.use(instance);
    app.use(hotMiddleware(compiler, {
        log: false,
    }));
    app.use(express.static(paths_1.default.appPublic));
    return app.listen(port, host);
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
    return __awaiter(this, void 0, void 0, function () {
        var host, port, newPort, devServer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!checkRequiredFiles([paths_1.default.appHtml, paths_1.default.appIndexJs])) {
                        process.exit(1);
                    }
                    host = argv.host, port = argv.port;
                    return [4 /*yield*/, WebpackDevServerUtils_1.choosePort(host, port)];
                case 1:
                    newPort = _a.sent();
                    devServer = createServer(host, newPort);
                    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
                        process.on(sig, function () {
                            devServer.close();
                            process.exit();
                        });
                    });
                    chokidar.watch([paths_1.default.appYmlEnv]).on('change', function () {
                        devServer.close();
                        devServer = createServer(host, newPort);
                    });
                    return [2 /*return*/];
            }
        });
    });
};
