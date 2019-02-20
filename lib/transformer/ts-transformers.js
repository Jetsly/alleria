"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleify_1 = require("../utils/moduleify");
const ts_import_1 = require("./ts-import");
const tsImportOptions = [
    ...moduleify_1.hasModule('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    ...moduleify_1.hasModule('ant-design-pro', {
        libraryName: 'ant-design-pro',
        libraryDirectory: 'lib',
        style: true,
        camel2DashComponentName: false,
    }),
];
module.exports = () => ({
    before: [
        ts_import_1.default(tsImportOptions),
        ...moduleify_1.hasModule('graphql-tag', require('ts-transform-graphql-tag').getTransformer()),
        ...moduleify_1.hasModule('react-hot-loader', require('ts-react-hot-transformer')()),
    ],
});
