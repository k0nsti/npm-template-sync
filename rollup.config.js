import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import executable from 'rollup-plugin-executable';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const external = [
  'os',
  'path',
  'crypto',
  'fs',
  'jsonpath',
  'local-repository-provider',
  'aggregation-repository-provider',
  'github-repository-provider',
  'bitbucket-repository-provider',
  'expression-expander'
];

export default [
  {
    output: {
      file: pkg.bin['npm-template-sync'],
      format: 'cjs',
      banner: '#!/usr/bin/env node'
    },
    plugins: [nodeResolve(), commonjs(), json(), executable()],
    external,
    input: 'src/npm-template-sync-cli.js'
  },
  {
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [],
    external,
    input: pkg.module
  }
];
