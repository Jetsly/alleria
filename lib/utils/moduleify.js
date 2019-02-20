"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveCwd = require("resolve-cwd");
function conditionModule(moduleName, trueBrancher) {
    const moduleUrl = resolveCwd.silent(moduleName);
    if (moduleUrl) {
        trueBrancher(moduleUrl);
    }
}
exports.conditionModule = conditionModule;
function hasModule(moduleName, returnVal) {
    const moduleUrl = resolveCwd.silent(moduleName);
    if (moduleUrl) {
        return [returnVal];
    }
    return [];
}
exports.hasModule = hasModule;
