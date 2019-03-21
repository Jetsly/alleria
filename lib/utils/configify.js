"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _register_1 = require("./_register");
const paths_1 = require("./paths");
const cosmiconfig = require("cosmiconfig");
function loaderDefault(module) {
    return module.default || module;
}
exports.loaderDefault = loaderDefault;
function loadCfg(name, suffix = 'rc') {
    const explorer = cosmiconfig(name, {
        searchPlaces: [
            `.${name}${suffix}.ts`,
            `${name}.config.ts`,
            `.${name}${suffix}.yaml`,
            `.${name}${suffix}.yml`,
        ],
        loaders: {
            '.yaml': cosmiconfig.loadYaml,
            '.yml': cosmiconfig.loadYaml,
            [_register_1.tsExt]: cosmiconfig.loadJs,
        },
    });
    const result = explorer.searchSync();
    if (result === null) {
        return null;
    }
    return loaderDefault(result.config);
}
exports.default = loadCfg;
function loadEnvYaml() {
    const yamlEnv = loadCfg(paths_1.default.appEnvFileName, '') || {};
    return Object.keys(yamlEnv).reduce((preDefind, envKey) => (Object.assign({}, preDefind, { [envKey]: JSON.stringify(yamlEnv[envKey]) })), {});
}
exports.loadEnvYaml = loadEnvYaml;
exports.shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
