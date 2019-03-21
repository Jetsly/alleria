"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configify_1 = require("../utils/configify");
const requireDir = require("require-dir");
function loadTmpHanlder() {
    const dirConfig = requireDir('./', {
        extensions: ['.js', '.ts'],
    });
    Object.keys(dirConfig).forEach(folder => {
        configify_1.loaderDefault(dirConfig[folder])();
    });
}
loadTmpHanlder();
