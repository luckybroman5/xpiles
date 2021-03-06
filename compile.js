'use strict';

const rollup = require('rollup');

const config = require('./rollup.config.js');

// see below for details on the options
const inputOptions = config.input;
const outputOptions = config.output;



module.exports = async function build(inputFile, outputFile) {
  // create a bundle

  if (inputFile) inputOptions.input = inputFile;
  if (outputFile) outputOptions.file = outputFile;

  const bundle = await rollup.rollup(inputOptions);
  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  // console.log(outputOptions);
  // const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}
