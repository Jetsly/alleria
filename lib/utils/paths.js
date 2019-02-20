"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const appDirectory = fs_1.realpathSync(process.cwd());
const resolveApp = relativePath => path_1.resolve(appDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
    const moduleFileExtensions = ['web.ts', 'ts', 'web.tsx', 'tsx'].find(extension => fs_1.existsSync(resolveFn(`${filePath}.${extension}`)));
    if (moduleFileExtensions) {
        return resolveFn(`${filePath}.${moduleFileExtensions}`);
    }
    return resolveFn(`${filePath}.ts`);
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
