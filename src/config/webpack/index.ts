import { HotModuleReplacementPlugin } from 'webpack';
import { loaderDefault, shouldUseSourceMap } from '../../utils/configify';

import requireDir = require('require-dir');
import Config = require('webpack-chain');
import resolveCwd = require('resolve-cwd');

function configProdBase(config: Config): void {
  const filename = '[name].[contenthash]';
  config.devtool(shouldUseSourceMap ? 'source-map' : false);
  config.output.chunkFilename(`js/${filename}.js`);
  config.output.filename(`js/${filename}.js`);
  config.output.hashDigestLength(8);
  config.plugin('mini-css').use(require('mini-css-extract-plugin'), [
    {
      filename: `css/${filename}.css`,
      chunkFilename: `css/${filename}.css`,
    },
  ]);
}

function configBase(config: Config): void {
  config.when(process.env.NODE_ENV === 'production', configProdBase, () => {
    config.devtool('cheap-module-source-map');
    config.plugin('hot-module').use(HotModuleReplacementPlugin);
    config.plugin('mini-css').use(require('mini-css-extract-plugin'));
    if (resolveCwd.silent('@hot-loader/react-dom')) {
      config.resolve.alias.set('react-dom', '@hot-loader/react-dom');
    }
  });
}

export default function webpackConfig(
  mode: 'development' | 'production'
): Config {
  process.env.NODE_ENV = mode;
  const config = new Config();

  config.mode(mode);
  configBase(config);

  const dirConfig = requireDir('./', {
    recurse: true,
    extensions: ['.js', '.ts'],
  });
  Object.keys(dirConfig).forEach(folder => {
    const files = dirConfig[folder];
    Object.keys(files).forEach(file =>
      loaderDefault<(config: Config) => void>(files[file])(config)
    );
  });
  return config;
}
