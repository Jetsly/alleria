/// <reference types="node" />
import postcss from 'postcss';
export default function componentLess({
  regex,
  plugins,
  paths,
}: Partial<{
  regex: RegExp;
  plugins: postcss.AcceptedPlugin[];
  paths: string[];
}>): import('stream').Transform;
