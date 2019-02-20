"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var appDirectory = fs_1.realpathSync(process.cwd());
var resolveApp = function (relativePath) { return path_1.resolve(appDirectory, relativePath); };
var resolveModule = function (resolveFn, filePath) {
    var moduleFileExtensions = ['web.ts', 'ts', 'web.tsx', 'tsx'].find(function (extension) { return fs_1.existsSync(resolveFn(filePath + "." + extension)); });
    if (moduleFileExtensions) {
        return resolveFn(filePath + "." + moduleFileExtensions);
    }
    return resolveFn(filePath + ".ts");
};
exports.default = {
    appPath: resolveApp('.'),
    appSrc: resolveApp('src'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appYmlEnv: resolveApp('.env.yml'),
    appPackageJson: resolveApp('package.json'),
    appTsConfig: resolveApp('tsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    appNodeModules: resolveApp('node_modules'),
};
