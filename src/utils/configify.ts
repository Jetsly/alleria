import { existsSync, readFileSync } from 'fs';
import { tsExt } from './_register';
import paths from './paths';

import cosmiconfig = require('cosmiconfig');
import yaml = require('js-yaml');
import Config = require('webpack-chain');

export function loaderDefault<T = any>(module): T {
  return module.default || module;
}

export function loadYaml(envPath) {
  try {
    if (existsSync(envPath)) {
      return yaml.safeLoad(readFileSync(envPath, 'utf8'));
    }
    return {};
  } catch (e) {
    return {};
  }
}

export function loadEnvYaml() {
  const yamlEnv = loadYaml(paths.appYmlEnv);
  return Object.keys(yamlEnv).reduce(
    (preDefind, envKey) => ({
      ...preDefind,
      [envKey]: JSON.stringify(yamlEnv[envKey]),
    }),
    {}
  );
}

export interface AlleriaConfig {
  proxy: {
    [key: string]: {
      target: string;
    };
  };
  chainWebpack(config: Config): void;
}

export default function loadCfg(): AlleriaConfig {
  const name = process.env.ALLERIA_NAME;
  const explorer = cosmiconfig(name, {
    searchPlaces: [`.${name}rc.ts`, `${name}.config.ts`],
    loaders: {
      [tsExt]: cosmiconfig.loadJs,
    },
  });
  const result = explorer.searchSync();
  if (result === null) {
    throw new Error(`not found ${name} config`);
  }
  return loaderDefault(result.config);
}

export const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
