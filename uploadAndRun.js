const { spawn } = require('child_process');
const EventEmitter = require('events');

module.exports = function devServer(host, user, passwordFile, bundle) {

  const emitter = new EventEmitter();
  let ssh;

  const userAndHostPrefix = `${user}@${host}`;
  const uploadedFileName = bundle.split('/').reverse()[0];

  const handleData = (data, prefix) => {
    console.log(`${prefix || ''}: ${data}`);
  };

  const handleError = (data, prefix) => handleData(data, `${prefix} ERROR:`);

  const scpDevServerFile = () => {
    console.log('Sending dev server file to host...');
    const prefix = `${userAndHostPrefix} scp`;
    const scp = spawn('scp', [bundle, `${user}@${host}:~/${uploadedFileName}`])

    scp.stdout.on('data', (data) => handleData(data, prefix));
    
    scp.stderr.on('data', (data) => handleError(data, prefix));
    
    scp.on('close', (code) => {
      console.log(`${prefix} process exited with code ${code}`);
      if (code == 0) {
        console.log('File Successfully uploaded!');
        emitter.emit('file_uploaded');
      }
    });
  }

  const startServer = () => {
    console.log('Executing Dev Server file on Host..');
    const prefix = `${userAndHostPrefix} ssh`;
    ssh = spawn('ssh', ['-tt', `${user}@${host}`, `node --debug ${uploadedFileName}`]);
  
    ssh.stdout.on('data', (data) => handleData(data, prefix));
    
    ssh.stderr.on('data', (data) => handleError(data, prefix));
    
    ssh.on('close', (code) => {
      console.log(`${prefix} process exited with code ${code}`);
    });
  };

  const restartServer = () => {
    console.log('restarting server...');
    if (!ssh) {
      startServer();
      return;
    }
    ssh.on('close', () => {
      startServer();
    })
    ssh.kill();
  };

  const stopServer = () => {
    if (ssh) {
      console.log('killing server...')
      ssh.kill();
    }
  };

  const main = () => {
    scpDevServerFile();
  }

  emitter.on('file_uploaded', () => {
    restartServer();
  });
  main();

  return {
    stopServer,
    restart: restartServer,
    reUploadAndRun: main,
  };
}