import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import chalk from 'chalk';
import chainConfig from '../../config/webpack';
import printServAddress from '../../utils/printServAddress';
import loadConfig from '../../utils/configify';
import paths from '../../utils/paths';

import checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

import webpack = require('webpack');
import WebpackDevServer = require('webpack-dev-server');
import friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const onErrors = (severity, errors) => {
  errors
    .filter(
      err =>
        err.module === undefined &&
        err.file === undefined &&
        err.name === undefined &&
        err.message === undefined
    )
    .forEach(err => process.stdout.write(err.webpackError));
  if (severity === 'error') {
    const moduleNot = errors
      .filter(
        err =>
          err.module === undefined &&
          err.type === 'module-not-found' &&
          err.webpackError.dependencies &&
          err.webpackError.dependencies.length &&
          err.webpackError.dependencies[0].options
      )
      .map(err => ({
        ...err,
        module: err.webpackError.dependencies[0].options.request,
      }));
    if (moduleNot.length) {
      process.stdout.write(`This relative module was not found:\n\n`);
      moduleNot.forEach(err =>
        process.stdout.write(`* ${err.module} in ${err.file}\n\n`)
      );
    }
  }
};

function createServer(host, port) {
  const messages = [
    [
      chalk.green(`Serving your ${process.env.ALLERIA_NAME} project`),
      printServAddress(port),
      '',
    ].join('\n'),
  ];
  const { chainWebpack, ...alleriaConfig } = loadConfig(
    process.env.ALLERIA_NAME
  ) || {
    chainWebpack: () => {},
  };
  const webpackConfig = chainConfig('development');
  (chainWebpack || (() => {}))(webpackConfig);
  webpackConfig
    .plugin('friendly-errors')
    .use(friendlyErrorsWebpackPlugin, [
      {
        compilationSuccessInfo: {
          messages,
        },
        onErrors,
      },
    ])
    .end();

  const hasFriendError = webpackConfig.plugins.has('friendly-errors');
  // const publicPath = webpackConfig.output.get('publicPath');
  const compiler = webpack(webpackConfig.toConfig());
  const server = new WebpackDevServer(compiler, {
    publicPath: compiler.options.output.publicPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    contentBase: paths.appPublic,
    quiet: hasFriendError,
    ...alleriaConfig,
  });
  // const app = express();
  // app.use(compress());
  // app.use(
  //   historyApiFallback({
  //     index: join(publicPath, '/index.html'),
  //   })
  // );
  // Object.keys(alleriaConfig.proxy || {}).forEach(prefix => {
  //   const { target, ...rest } = alleriaConfig.proxy[prefix];
  //   app.use(
  //     prefix,
  //     httpProxyMiddleware(prefix, {
  //       target,
  //       changeOrigin: true,
  //       secure: false,
  //       ...rest,
  //     })
  //   );
  // });

  // const instance = devMiddleware(compiler, {
  //   publicPath: compiler.options.output.publicPath,
  //   logLevel: hasFriendError ? 'silent' : 'info',
  // });
  // app.use(instance);
  // app.use(
  //   hotMiddleware(compiler, {
  //     log: false,
  //   })
  // );
  // app.use(express.static(paths.appPublic));
  return server.listen(port, host);
}

exports.command = 'react-serve';
exports.desc = 'develop react project';
exports.builder = {
  host: {
    default: '0.0.0.0',
  },
  port: {
    default: 8080,
  },
};

exports.handler = async function serveReact(argv) {
  if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
  }
  const { host, port } = argv;
  const newPort = await choosePort(host, port);
  // require('../../tmp/index');
  createServer(host, newPort);
};
