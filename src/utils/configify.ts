import { tsExt } from './_register';
import paths from './paths';

import cosmiconfig = require('cosmiconfig');
import Config = require('webpack-chain');

export function loaderDefault<T = any>(module): T {
  return module.default || module;
}

export interface AlleriaConfig {
  proxy: {
    [key: string]: {
      target: string;
    };
  };
  chainWebpack(config: Config): void;
}

export default function loadCfg(name, suffix = 'rc'): AlleriaConfig {
  const explorer = cosmiconfig(name, {
    searchPlaces: [
      `.${name}${suffix}.ts`,
      `${name}.config.ts`,
      `.${name}${suffix}.yaml`,
      `.${name}${suffix}.yml`,
    ],
    loaders: {
      '.yaml': cosmiconfig.loadYaml,
      '.yml': cosmiconfig.loadYaml,
      [tsExt]: cosmiconfig.loadJs,
    },
  });
  const result = explorer.searchSync();
  if (result === null) {
    return null;
  }
  return loaderDefault(result.config);
}

export function loadEnvYaml() {
  const yamlEnv = loadCfg(paths.appEnvFileName, '') || {};
  return Object.keys(yamlEnv).reduce(
    (preDefind, envKey) => ({
      ...preDefind,
      [envKey]: JSON.stringify(yamlEnv[envKey]),
    }),
    {}
  );
}

export const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
