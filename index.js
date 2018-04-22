const commandLineArgs = require('command-line-args')

/* first - parse the main command */
const mainDefinitions = [
  { name: 'command', defaultOption: true }
]
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

// console.log('mainOptions\n===========')
// console.log(mainOptions)

/* second - parse the merge command options */
// if (mainOptions.command === 'merge') {
//   const mergeDefinitions = [
//     { name: 'squash', type: Boolean },
//     { name: 'message', alias: 'm' }
//   ]
//   const mergeOptions = commandLineArgs(mergeDefinitions, { argv })

  // console.log('\nmergeOptions\n============')
  // console.log(mergeOptions)
// }

// console.log(mainOptions);

if (mainOptions.command === 'compile') {
  const compileDefinitions = [
    { name: 'src'},
    { name: 'dest'}
  ];

  const compileOptions = commandLineArgs(compileDefinitions, { argv });
  

  // console.log(compileOptons);
  require('./compile')(compileOptions.src, compileOptions.dest);
}
