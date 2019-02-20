"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var chalk_1 = require("chalk");
var boxen = require("boxen");
var clipboardy = require("clipboardy");
function getNetworkAddress() {
    var interfaces = os_1.networkInterfaces();
    return Object.keys(interfaces)
        .map(function (name) {
        return interfaces[name].find(function (_a) {
            var family = _a.family, internal = _a.internal;
            return family === 'IPv4' && !internal;
        });
    })
        .filter(function (item) { return item && item.address; })
        .map(function (item) { return item.address; })
        .shift();
}
function printServAddress(port) {
    var ip = getNetworkAddress();
    var localAddress = "http://localhost:" + port;
    var networkAddress = "http://" + ip + ":" + port;
    var message = [
        chalk_1.default.bold("- Local:") + "            " + localAddress,
        chalk_1.default.bold('- On Your Network:') + "  " + networkAddress,
        '',
        "" + chalk_1.default.grey('Copied local address to clipboard!'),
    ];
    if (process.platform !== "linux") {
        clipboardy.writeSync(networkAddress);
    }
    return boxen(message.join('\n'), {
        padding: 1,
        borderColor: 'gray',
        borderStyle: 'classic',
    });
}
exports.default = printServAddress;
