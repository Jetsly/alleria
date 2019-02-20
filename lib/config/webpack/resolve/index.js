"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("../../../utils/paths");
function loaderConfig(config) {
    config.entry('index').add(paths_1.default.appIndexJs);
    config.output.publicPath('/');
    // config.resolve.modules.merge([
    //   paths.appNodeModules,
    //   join(__dirname, '../../../../node_modules'),
    // ]);
    config.resolve.extensions.merge(['.ts', '.tsx', '.js', '.json']);
}
exports.default = loaderConfig;
