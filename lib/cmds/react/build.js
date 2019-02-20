"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const FileSizeReporter_1 = require("react-dev-utils/FileSizeReporter");
const path_1 = require("path");
const webpack_1 = require("../../config/webpack");
const paths_1 = require("../../utils/paths");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const printBuildError = require("react-dev-utils/printBuildError");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
function copyPublicFolder(appBuild) {
    fs_extra_1.copySync(paths_1.default.appPublic, appBuild, {
        dereference: true,
        filter: file => file !== paths_1.default.appHtml,
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!checkRequiredFiles([paths_1.default.appHtml, paths_1.default.appIndexJs])) {
            process.exit(1);
        }
        const { outDir } = argv;
        const appBuild = path_1.join(process.cwd(), outDir);
        const webpackConfig = webpack_1.default('production');
        webpackConfig.output.path(appBuild);
        const compiler = webpack(webpackConfig.toConfig());
        const buildFolder = webpackConfig.output.get('path');
        const previousFileSizes = yield FileSizeReporter_1.measureFileSizesBeforeBuild(buildFolder);
        fs_extra_1.emptyDirSync(compiler.options.output.path);
        copyPublicFolder(appBuild);
        compiler.run((err, webpackStats) => __awaiter(this, void 0, void 0, function* () {
            const rawMessages = webpackStats.toJson({});
            const messages = formatWebpackMessages(rawMessages);
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
        }));
    });
};
