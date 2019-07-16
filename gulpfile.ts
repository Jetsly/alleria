import { src, task, dest } from 'gulp';
import gulpTs from 'gulp-typescript';

task(function build() {
  return src(['./src/**/*.ts', '!./src/**/*.test.ts'])
    .pipe(gulpTs.createProject('tsconfig.json', {})())
    .pipe(dest('./lib'));
});
