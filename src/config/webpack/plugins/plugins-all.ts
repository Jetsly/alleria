import { DefinePlugin } from 'webpack';
import { sync } from 'find-up';
import { loadEnvYaml } from '../../../utils/configify';

import Config = require('webpack-chain');

export default function loaderConfig(config: Config): void {
  config.plugin('webpackbar').use(require('webpackbar'));
  config
    .plugin('webpack-filter-warnings')
    .use(require('webpack-filter-warnings-plugin'), [
      {
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      },
    ]);

  config
    .plugin('ignore-moment-locale')
    .use(require('webpack/lib/IgnorePlugin'), [/^\.\/locale$/, /moment$/]);

  config.resolve
    .plugin('tsconfig-paths')
    .use(require('tsconfig-paths-webpack-plugin'), [
      {
        configFile: sync('tsconfig.json'),
      },
    ]);

  config.plugin('define-config-env').use(DefinePlugin, [loadEnvYaml()]);
}
