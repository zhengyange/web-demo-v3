var child_process = require('child_process');
var config = require('./config');
var cmdCli = 'fis3 release prod -d ' + config.assetsRoot;
var cpRelease = child_process.exec(cmdCli);
cpRelease.stdout.pipe(process.stdout);