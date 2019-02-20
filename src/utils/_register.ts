import { transpileModule } from 'typescript';

export const tsExt = '.ts';

function registerTs(): void {
  const old = require.extensions[tsExt] || require.extensions['.js'];
  require.extensions[tsExt] = (m: any, fileName: string) => {
    // eslint-disable-next-line no-underscore-dangle
    const oldCompile = m._compile;
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    m._compile = function compileFile(code: string): any {
      const result = transpileModule(code, {
        fileName,
        reportDiagnostics: true,
      });
      return oldCompile.call(this, result.outputText, fileName);
    };
    return old(m, fileName);
  };
}
registerTs();
