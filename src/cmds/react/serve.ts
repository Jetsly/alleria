import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import chalk from 'chalk';
import { join } from 'path';
import chainConfig from '../../config/webpack';
import printServAddress from '../../utils/printServAddress';
import loadConfig from '../../utils/configify';
import paths from '../../utils/paths';

import checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

import chokidar = require('chokidar');
import express = require('express');
import compress = require('compression');
import webpack = require('webpack');
import devMiddleware = require('webpack-dev-middleware');
import hotMiddleware = require('webpack-hot-middleware');
import historyApiFallback = require('connect-history-api-fallback');
import httpProxyMiddleware = require('http-proxy-middleware');
import friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const onErrors = (severity, errors) => {
  const unOutputError = errors.filter(
    err =>
      err.module === undefined &&
      err.file === undefined &&
      err.name === undefined &&
      err.message === undefined
  );
  if (unOutputError.length) {
    unOutputError.forEach(err => process.stdout.write(err.webpackError));
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
  const alleriaConfig = loadConfig();
  const webpackConfig = chainConfig('development');
  (alleriaConfig.chainWebpack || (() => {}))(webpackConfig);
  Object.keys(webpackConfig.entryPoints.entries()).forEach(name => {
    webpackConfig.entry(name).add('webpack-hot-middleware/client');
  });
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
  const publicPath = webpackConfig.output.get('publicPath');
  const app = express();
  app.use(compress());
  app.use(
    historyApiFallback({
      index: join(publicPath, '/index.html'),
    })
  );
  Object.keys(alleriaConfig.proxy || {}).forEach(prefix => {
    const { target, ...rest } = alleriaConfig.proxy[prefix];
    app.use(
      prefix,
      httpProxyMiddleware(prefix, {
        target,
        changeOrigin: true,
        secure: false,
        ...rest,
      })
    );
  });
  const compiler = webpack(webpackConfig.toConfig());
  const instance = devMiddleware(compiler, {
    publicPath: compiler.options.output.publicPath,
    logLevel: hasFriendError ? 'silent' : 'info',
  });
  app.use(instance);
  app.use(
    hotMiddleware(compiler, {
      log: false,
    })
  );
  app.use(express.static(paths.appPublic));
  return app.listen(port, host);
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
  let devServer = createServer(host, newPort);
  ['SIGINT', 'SIGTERM'].forEach((sig: 'SIGTERM' | 'SIGINT') => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });

  chokidar.watch([paths.appYmlEnv]).on('change', () => {
    devServer.close();
    devServer = createServer(host, newPort);
  });
};
