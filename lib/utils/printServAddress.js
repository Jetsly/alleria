"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const chalk_1 = require("chalk");
const boxen = require("boxen");
const clipboardy = require("clipboardy");
function getNetworkAddress() {
    const interfaces = os_1.networkInterfaces();
    return Object.keys(interfaces)
        .map(name => {
        return interfaces[name].find(({ family, internal }) => family === 'IPv4' && !internal);
    })
        .filter(item => item && item.address)
        .map(item => item.address)
        .shift();
}
function printServAddress(port) {
    const ip = getNetworkAddress();
    const localAddress = `http://localhost:${port}`;
    const networkAddress = `http://${ip}:${port}`;
    const message = [
        `${chalk_1.default.bold(`- Local:`)}            ${localAddress}`,
        `${chalk_1.default.bold('- On Your Network:')}  ${networkAddress}`,
        '',
        `${chalk_1.default.grey('Copied local address to clipboard!')}`,
    ];
    if (process.platform !== `linux`) {
        clipboardy.writeSync(networkAddress);
    }
    return boxen(message.join('\n'), {
        padding: 1,
        borderColor: 'gray',
        borderStyle: 'classic',
    });
}
exports.default = printServAddress;
