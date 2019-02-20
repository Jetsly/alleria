"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var FileSizeReporter_1 = require("react-dev-utils/FileSizeReporter");
var path_1 = require("path");
var webpack_1 = require("../../config/webpack");
var paths_1 = require("../../utils/paths");
var webpack = require("webpack");
var formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
var printBuildError = require("react-dev-utils/printBuildError");
var checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
function copyPublicFolder(appBuild) {
    fs_extra_1.copySync(paths_1.default.appPublic, appBuild, {
        dereference: true,
        filter: function (file) { return file !== paths_1.default.appHtml; },
    });
}
exports.command = 'react-build';
exports.desc = 'build react project';
exports.builder = {
    outDir: {
        alias: 'd',
        default: 'build',
    },
};
exports.handler = function buildReact(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var outDir, appBuild, webpackConfig, compiler, buildFolder, previousFileSizes;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!checkRequiredFiles([paths_1.default.appHtml, paths_1.default.appIndexJs])) {
                        process.exit(1);
                    }
                    outDir = argv.outDir;
                    appBuild = path_1.join(process.cwd(), outDir);
                    webpackConfig = webpack_1.default('production');
                    webpackConfig.output.path(appBuild);
                    compiler = webpack(webpackConfig.toConfig());
                    buildFolder = webpackConfig.output.get('path');
                    return [4 /*yield*/, FileSizeReporter_1.measureFileSizesBeforeBuild(buildFolder)];
                case 1:
                    previousFileSizes = _a.sent();
                    fs_extra_1.emptyDirSync(compiler.options.output.path);
                    copyPublicFolder(appBuild);
                    compiler.run(function (err, webpackStats) { return __awaiter(_this, void 0, void 0, function () {
                        var rawMessages, messages;
                        return __generator(this, function (_a) {
                            rawMessages = webpackStats.toJson({});
                            messages = formatWebpackMessages(rawMessages);
                            if (messages.errors.length) {
                                printBuildError(new Error(messages.errors.join('\n\n')));
                            }
                            else {
                                if (messages.warnings.length) {
                                    process.stdout.write(messages.warnings.join('\n\n'));
                                    // process.stdout.write(
                                    //   `\nSearch for the ${chalk.underline(
                                    //     chalk.yellow('keywords')
                                    //   )} to learn more about each warning.`
                                    // );
                                    // process.stdout.write(
                                    //   `To ignore, add ${chalk.cyan(
                                    //     '// eslint-disable-next-line'
                                    //   )} to the line before.\n`
                                    // );
                                }
                                process.stdout.write('\n\nFile sizes after gzip:\n\n');
                                FileSizeReporter_1.printFileSizesAfterBuild(webpackStats, previousFileSizes, buildFolder);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
};
