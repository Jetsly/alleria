import { hasModule } from '../utils/moduleify';
import tsImport from './ts-import';

const tsImportOptions = [
  ...hasModule('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  ...hasModule('ant-design-pro', {
    libraryName: 'ant-design-pro',
    libraryDirectory: 'lib',
    style: true,
    camel2DashComponentName: false,
  }),
];

module.exports = () => ({
  before: [
    tsImport(tsImportOptions),
    ...hasModule(
      'graphql-tag',
      require('ts-transform-graphql-tag').getTransformer()
    ),
    ...hasModule('react-hot-loader', require('ts-react-hot-transformer')()),
  ],
});
