"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("typescript");
exports.tsExt = '.ts';
function registerTs() {
    var old = require.extensions[exports.tsExt] || require.extensions['.js'];
    require.extensions[exports.tsExt] = function (m, fileName) {
        // eslint-disable-next-line no-underscore-dangle
        var oldCompile = m._compile;
        // eslint-disable-next-line no-param-reassign,no-underscore-dangle
        m._compile = function compileFile(code) {
            var result = typescript_1.transpileModule(code, {
                fileName: fileName,
                reportDiagnostics: true,
            });
            return oldCompile.call(this, result.outputText, fileName);
        };
        return old(m, fileName);
    };
}
registerTs();
