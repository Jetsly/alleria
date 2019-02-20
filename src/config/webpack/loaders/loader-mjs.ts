import { cpus } from 'os';

import Config = require('webpack-chain');

export default function loaderConfig(config: Config): void {
  (config.module.rule('mjs').test(/\.mjs$/) as any).type('javascript/auto');

  config.module
    .rule('compile-mjs')
    .test(/\.mjs$/i)

    // .use('cache-loader')
    // .loader(require.resolve('cache-loader'))
    // .end()

    .use('ts-loader')
    .loader(require.resolve('ts-loader'))
    .options({
      transpileOnly: true,
    });
}
