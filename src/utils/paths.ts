import { realpathSync, existsSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
  const moduleFileExtensions = ['web.ts', 'ts', 'web.tsx', 'tsx'].find(
    extension => existsSync(resolveFn(`${filePath}.${extension}`))
  );
  if (moduleFileExtensions) {
    return resolveFn(`${filePath}.${moduleFileExtensions}`);
  }
  return resolveFn(`${filePath}.ts`);
};

export default {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appYmlEnv: resolveApp('.env.yml'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};
