"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const _register_1 = require("./_register");
const paths_1 = require("./paths");
const cosmiconfig = require("cosmiconfig");
const yaml = require("js-yaml");
function loaderDefault(module) {
    return module.default || module;
}
exports.loaderDefault = loaderDefault;
function loadYaml(envPath) {
    try {
        if (fs_1.existsSync(envPath)) {
            return yaml.safeLoad(fs_1.readFileSync(envPath, 'utf8')) || {};
        }
        return {};
    }
    catch (e) {
        return {};
    }
}
exports.loadYaml = loadYaml;
function loadEnvYaml() {
    const yamlEnv = loadYaml(paths_1.default.appYmlEnv);
    return Object.keys(yamlEnv).reduce((preDefind, envKey) => (Object.assign({}, preDefind, { [envKey]: JSON.stringify(yamlEnv[envKey]) })), {});
}
exports.loadEnvYaml = loadEnvYaml;
function loadCfg() {
    const name = process.env.ALLERIA_NAME;
    const explorer = cosmiconfig(name, {
        searchPlaces: [`.${name}rc.ts`, `${name}.config.ts`],
        loaders: {
            [_register_1.tsExt]: cosmiconfig.loadJs,
        },
    });
    const result = explorer.searchSync();
    if (result === null) {
        throw new Error(`not found ${name} config`);
    }
    return loaderDefault(result.config);
}
exports.default = loadCfg;
exports.shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
