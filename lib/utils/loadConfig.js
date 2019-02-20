"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _register_1 = require("./_register");
var cosmiconfig = require("cosmiconfig");
function loaderDefault(module) {
    return module.default || module;
}
exports.loaderDefault = loaderDefault;
function loadCfg() {
    var _a;
    var name = process.env.ALLERIA_NAME;
    var explorer = cosmiconfig(name, {
        searchPlaces: ["." + name + "rc.ts", name + ".config.ts"],
        loaders: (_a = {},
            _a[_register_1.tsExt] = cosmiconfig.loadJs,
            _a),
    });
    var result = explorer.searchSync();
    if (result === null) {
        throw new Error("not found " + name + " config");
    }
    return loaderDefault(result.config);
}
exports.default = loadCfg;
exports.shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
