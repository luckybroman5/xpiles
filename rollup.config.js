const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const closure = require('rollup-plugin-closure-compiler-js');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');

// import commonjs from 'rollup-plugin-commonjs';
// import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
// import closure from 'rollup-plugin-closure-compiler-js';
// import uglify from 'rollup-plugin-uglify';
// import filesize from 'rollup-plugin-filesize';

const useBabel = false;
const useGoogleClosure = true;
const useUglify = false;


const RollupConf = {
  input: {
    input: 'index.js',
    plugins: [],
  },
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
};

RollupConf.input.plugins.push(commonjs());

RollupConf.input.plugins.push(resolve({
  // pass custom options to the resolve plugin
  customResolveOptions: {
    moduleDirectory: 'node_modules'
  }
}));

if (useBabel) {
  RollupConf.input.plugins.push(babel({
    exclude: 'node_modules/**' // only transpile our source code
  }));
}

if (useGoogleClosure) {
  RollupConf.input.plugins.push(closure());
}

if (useUglify) {
  RollupConf.input.plugins.push(uglify());
}

RollupConf.input.plugins.push(filesize());

module.exports = RollupConf;