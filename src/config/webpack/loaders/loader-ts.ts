import { sync } from 'find-up';
import { join } from 'path';

import Config = require('webpack-chain');

export default function loaderConfig(config: Config): void {
  config.module
    .rule('compile-ts')
    .test(/\.(tsx|ts)$/i)
    .exclude.add(/node_modules/)
    .end()

    // .use('cache-loader')
    // .loader(require.resolve('cache-loader'))
    // .end()

    .use('ts-loader')
    .loader(require.resolve('ts-loader'))
    .options({
      transpileOnly: true,
      happyPackMode: true,
      compilerOptions: {
        module: 'es2015',
      },
      getCustomTransformers: join(
        __dirname,
        '../../../transformer/ts-transformers.js'
      ),
    })
    .end();

  config
    .plugin('fork-ts-checker')
    .use(require('fork-ts-checker-webpack-plugin'), [
      {
        tsconfig: sync('tsconfig.json'),
        checkSyntacticErrors: true,
        formatter: 'codeframe',
      },
    ]);
}
