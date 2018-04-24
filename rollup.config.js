const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const closure = require('rollup-plugin-closure-compiler-js');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');
const json = require('rollup-plugin-json');

// @TODO Can i use import here?
// import commonjs from 'rollup-plugin-commonjs';
// import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
// import closure from 'rollup-plugin-closure-compiler-js';
// import uglify from 'rollup-plugin-uglify';
// import filesize from 'rollup-plugin-filesize';

const useBabel = true;
const useGoogleClosure = false;
const useUglify = true;


const RollupConf = {
  input: {
    input: 'index.js',
    plugins: [],
  },
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
};

RollupConf.input.plugins.push(commonjs());

RollupConf.input.plugins.push(json());

RollupConf.input.plugins.push(resolve({
  // pass custom options to the resolve plugin
  customResolveOptions: {
    moduleDirectory: 'node_modules'
  },
  extensions: [ '.js', '.json' ],
}));

if (useBabel) {
  RollupConf.input.plugins.push(babel({
   exclude: [
     'node_modules/**', // only transpile our source code
     '*.json'
   ]
  }));
}

if (useGoogleClosure) {
  RollupConf.input.plugins.push(closure({
    env: 'CUSTOM',
    compilationLevel: 'ADVANCED',
  }));
}


if (useUglify) {
  RollupConf.input.plugins.push(uglify());
}

RollupConf.input.plugins.push(filesize());

module.exports = RollupConf;