import { conditionModule } from '../../../utils/moduleify';

import Config = require('webpack-chain');
import resolveCwd = require('resolve-cwd');

const DEFAULT_INLINE_LIMIT = 10000;

export default function loaderConfig(config: Config): void {
  //   config.module
  //     .rule('eslint-loader')
  //     .test(/\.tsx?$/i)
  //     .enforce('pre')
  //     .use('eslint-loader')
  //     .loader(require.resolve('eslint-loader'))
  //     .end();
  conditionModule('graphql-tag', () => {
    config.module
      .rule('compile-graphql')
      .test(/\.(graphql|gql)$/i)
      .exclude.add(/node_modules/)
      .end()
      .use('graphql-loader')
      .loader(resolveCwd.silent('graphql-tag/loader'));
  });

  config.module
    .rule('compile-url')
    .test(/\.(png|jpe?g|gif|svg)$/i)
    .exclude.add(/node_modules/)
    .end()
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: DEFAULT_INLINE_LIMIT,
      name: 'images/[name].[hash:8].[ext]',
    });
}
