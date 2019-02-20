import resolveCwd = require('resolve-cwd');

export function conditionModule(
  moduleName: string,
  trueBrancher: (module: string) => void
): void {
  const moduleUrl = resolveCwd.silent(moduleName);
  if (moduleUrl) {
    trueBrancher(moduleUrl);
  }
}

export function hasModule<T = any>(moduleName, returnVal): T[] {
  const moduleUrl = resolveCwd.silent(moduleName);
  if (moduleUrl) {
    return [returnVal];
  }
  return [];
}
