const rollup = require('rollup');

const uploadAndRun = require('./uploadAndRun');

const config = require('./rollup.config.js');

// see below for details on the options
const inputOptions = config.input;
const outputOptions = config.output;

module.exports = function (inputFile, outputFile, host, user, identityFile) {
  // create a bundle

  if (inputFile) inputOptions.input = inputFile;
  if (outputFile) outputOptions.file = outputFile;

  let session;

  const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
    watch: {
      // chokidar,
      include: './**',
      exclude: [
        'node_modules/**',
        outputOptions.file,
      ],
    }
  };

  const watcher = rollup.watch(watchOptions);
  watcher.on('event', event => {
    if (event.code === 'ERROR') {
      console.log(event.error);
    }
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error
    if (event.code === 'END' && host && user) {
      if (session) {
        session.reUploadAndRun()
      } else {
        session = uploadAndRun(host, user, identityFile, outputOptions.file);
      }
    }
  });
}