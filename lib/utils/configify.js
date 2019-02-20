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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var _register_1 = require("./_register");
var paths_1 = require("./paths");
var cosmiconfig = require("cosmiconfig");
var yaml = require("js-yaml");
function loaderDefault(module) {
    return module.default || module;
}
exports.loaderDefault = loaderDefault;
function loadYaml(envPath) {
    try {
        if (fs_1.existsSync(envPath)) {
            return yaml.safeLoad(fs_1.readFileSync(envPath, 'utf8'));
        }
        return {};
    }
    catch (e) {
        return {};
    }
}
exports.loadYaml = loadYaml;
function loadEnvYaml() {
    var yamlEnv = loadYaml(paths_1.default.appYmlEnv);
    return Object.keys(yamlEnv).reduce(function (preDefind, envKey) {
        var _a;
        return (__assign({}, preDefind, (_a = {}, _a[envKey] = JSON.stringify(yamlEnv[envKey]), _a)));
    }, {});
}
exports.loadEnvYaml = loadEnvYaml;
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
