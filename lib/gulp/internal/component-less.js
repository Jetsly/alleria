"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const through2_1 = __importDefault(require("through2"));
const postcss_1 = __importDefault(require("postcss"));
const less_1 = __importDefault(require("less"));
const less_plugin_npm_import_1 = __importDefault(require("less-plugin-npm-import"));
function componentLess({ regex = /\/style\/index\.less$/, plugins = [], paths = [], }) {
    return through2_1.default.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(regex)) {
            const resolvedLessFile = path_1.resolve(process.cwd(), file.path);
            let data = file.contents.toString();
            data = data.replace(/^\uFEFF/, '');
            const lessOpts = {
                paths: [path_1.dirname(resolvedLessFile)].concat(paths),
                filename: resolvedLessFile,
                plugins: [new less_plugin_npm_import_1.default({ prefix: '~' })],
                javascriptEnabled: true,
            };
            less_1.default
                .render(data, lessOpts)
                .then(result => {
                const source = result.css;
                if (Array.isArray(plugins) && plugins.length) {
                    return postcss_1.default(plugins).process(source, {
                        from: lessOpts.paths[0],
                    });
                }
                return Promise.resolve({
                    css: source,
                });
            })
                .then(r => {
                file.contents = Buffer.from(r.css);
                file.path = file.path.replace(/\.less$/, '.css');
                this.push(file);
                next();
            })
                .catch(e => {
                console.error(e);
            });
        }
        else {
            next();
        }
    });
}
exports.default = componentLess;
