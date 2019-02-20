"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
exports.tsExt = '.ts';
function registerTs() {
    const old = require.extensions[exports.tsExt] || require.extensions['.js'];
    require.extensions[exports.tsExt] = (m, fileName) => {
        // eslint-disable-next-line no-underscore-dangle
        const oldCompile = m._compile;
        // eslint-disable-next-line no-param-reassign,no-underscore-dangle
        m._compile = function compileFile(code) {
            const result = typescript_1.transpileModule(code, {
                fileName,
                reportDiagnostics: true,
            });
            return oldCompile.call(this, result.outputText, fileName);
        };
        return old(m, fileName);
    };
}
registerTs();
