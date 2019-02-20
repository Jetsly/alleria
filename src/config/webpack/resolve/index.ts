import paths from '../../../utils/paths';

import Config = require('webpack-chain');

export default function loaderConfig(config: Config): void {
  config.entry('index').add(paths.appIndexJs);
  config.output.publicPath('/');
  // config.resolve.modules.merge([
  //   paths.appNodeModules,
  //   join(__dirname, '../../../../node_modules'),
  // ]);
  config.resolve.extensions.merge(['.ts', '.tsx', '.js', '.json']);
}
