#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const compile = require('./compile')
const watch = require('./watch')

/* first - parse the main command */
const mainDefinitions = [
  { name: 'command', defaultOption: true }
]
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

if (mainOptions.command === 'compile') {
  const compileDefinitions = [
    { name: 'src'},
    { name: 'dest'}
  ];

  const compileOptions = commandLineArgs(compileDefinitions, { argv });
  

  // console.log(compileOptons);
  compile(compileOptions.src, compileOptions.dest);
}

if (mainOptions.command === 'watch') {
  const watchDefinitions = [
    { name: 'src'},
    { name: 'dest'},
    { name: 'host' },
    { name: 'user' },
    { name: 'passwordFile', alias: 'i' },
  ];

  const watchOptions = commandLineArgs(watchDefinitions, { argv });
  
  watch(watchOptions.src, watchOptions.dest, watchOptions.host, watchOptions.user, watchOptions.passwordFile);
}

if (mainOptions.command === 'run') {
  const waitDefinitions = [
    { name: 'host' },
    { name: 'user' },
    { name: 'passwordFile', alias: 'i' },
    { name: 'bundle' },
  ];

  const waitOptions = commandLineArgs(waitDefinitions, { argv });

  require('./uploadAndRun')(waitOptions.host, waitOptions.user, waitOptions.passwordFile, waitOptions.bundle);
}