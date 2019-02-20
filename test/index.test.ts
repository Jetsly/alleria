import * as ts from 'typescript';
import chainConfig from '../src/config/webpack/index';

const printer = ts.createPrinter();
test('webpack development config', async () => {
  const webpackConfig = chainConfig('development');
  expect(webpackConfig.toString()).toMatchSnapshot();
});

test('webpack production config', async () => {
  const webpackConfig = chainConfig('production');
  expect(webpackConfig.toString()).toMatchSnapshot();
});
