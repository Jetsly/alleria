"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleify_1 = require("../utils/moduleify");
var ts_import_1 = require("./ts-import");
var tsImportOptions = moduleify_1.hasModule('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
}).concat(moduleify_1.hasModule('ant-design-pro', {
    libraryName: 'ant-design-pro',
    libraryDirectory: 'lib',
    style: true,
    camel2DashComponentName: false,
}));
module.exports = function () { return ({
    before: [
        ts_import_1.default(tsImportOptions)
    ].concat(moduleify_1.hasModule('graphql-tag', require('ts-transform-graphql-tag').getTransformer()), moduleify_1.hasModule('react-hot-loader', require('ts-react-hot-transformer')())),
}); };
