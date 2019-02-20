"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveCwd = require("resolve-cwd");
function conditionModule(moduleName, trueBrancher) {
    var moduleUrl = resolveCwd.silent(moduleName);
    if (moduleUrl) {
        trueBrancher(moduleUrl);
    }
}
exports.conditionModule = conditionModule;
function hasModule(moduleName, returnVal) {
    var moduleUrl = resolveCwd.silent(moduleName);
    if (moduleUrl) {
        return [returnVal];
    }
    return [];
}
exports.hasModule = hasModule;
