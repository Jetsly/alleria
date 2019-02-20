import { emptyDirSync, copySync } from 'fs-extra';
import {
  printFileSizesAfterBuild,
  measureFileSizesBeforeBuild,
} from 'react-dev-utils/FileSizeReporter';
import { join } from 'path';

import chainConfig from '../../config/webpack';
import paths from '../../utils/paths';

import webpack = require('webpack');
import formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
import printBuildError = require('react-dev-utils/printBuildError');
import checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

function copyPublicFolder(appBuild) {
  copySync(paths.appPublic, appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

exports.command = 'react-build';
exports.desc = 'build react project';
exports.builder = {
  outDir: {
    alias: 'd',
    default: 'build',
  },
};

exports.handler = async function buildReact(argv) {
  if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
  }
  const { outDir } = argv;
  const appBuild = join(process.cwd(), outDir);
  const webpackConfig = chainConfig('production');
  webpackConfig.output.path(appBuild);
  const compiler = webpack(webpackConfig.toConfig());
  const buildFolder = webpackConfig.output.get('path');

  const previousFileSizes = await measureFileSizesBeforeBuild(buildFolder);
  emptyDirSync(compiler.options.output.path);
  copyPublicFolder(appBuild);

  compiler.run(async (err, webpackStats) => {
    const rawMessages = webpackStats.toJson({});
    const messages = formatWebpackMessages(rawMessages);
    if (messages.errors.length) {
      printBuildError(new Error(messages.errors.join('\n\n')));
    } else {
      if (messages.warnings.length) {
        process.stdout.write(messages.warnings.join('\n\n'));
        // process.stdout.write(
        //   `\nSearch for the ${chalk.underline(
        //     chalk.yellow('keywords')
        //   )} to learn more about each warning.`
        // );
        // process.stdout.write(
        //   `To ignore, add ${chalk.cyan(
        //     '// eslint-disable-next-line'
        //   )} to the line before.\n`
        // );
      }
      process.stdout.write('\n\nFile sizes after gzip:\n\n');
      printFileSizesAfterBuild(webpackStats, previousFileSizes, buildFolder);
    }
  });
};
