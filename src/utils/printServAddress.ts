import { networkInterfaces } from 'os';
import chalk from 'chalk';

import boxen = require('boxen');
import clipboardy = require('clipboardy');

function getNetworkAddress(): string {
  const interfaces = networkInterfaces();
  return Object.keys(interfaces)
    .map(name => {
      return interfaces[name].find(
        ({ family, internal }) => family === 'IPv4' && !internal
      );
    })
    .filter(item => item && item.address)
    .map(item => item.address)
    .shift();
}

export default function printServAddress(port: number): string {
  const ip = getNetworkAddress();
  const localAddress = `http://localhost:${port}`;
  const networkAddress = `http://${ip}:${port}`;
  const message = [
    `${chalk.bold(`- Local:`)}            ${localAddress}`,
    `${chalk.bold('- On Your Network:')}  ${networkAddress}`,
    '',
    `${chalk.grey('Copied local address to clipboard!')}`,
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
