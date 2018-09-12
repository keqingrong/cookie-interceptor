import json from 'rollup-plugin-json';

import {
  author,
  name,
  version
} from './package.json';

const banner = `/* @license ${name} v${version} | (c) ${author} */`;

const config = {
  input: 'src/index.js',
  output: [{
      file: `dist/${name}.esm.js`,
      format: 'es',
      sourcemap: true,
      banner: banner
    },
    {
      file: `dist/${name}.umd.js`,
      name: 'CookieInterceptor',
      format: 'umd',
      sourcemap: true,
      banner: banner
    }
  ],
  plugins: [
    json()
  ]
};

export default config;
