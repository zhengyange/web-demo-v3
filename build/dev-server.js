var express = require('express');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var child_process = require('child_process');
var proxyMiddleware = require('http-proxy-middleware')
var config = require('./config');
var proxyTable = config.proxyTable
var app = express();


app.use(express.static(config.assetsPublicPath))
// app.set('views', config.assetsPublicPath)
// app.engine('.html', require('ejs').__express);  
// app.set('view engine', 'html'); 

// 子进程fis3命令

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){});

if(!fs.existsSync(config.assetsRoot)) {
	fs.mkdirSync(config.assetsRoot)
}
fs.watch(config.assetsRoot, function(eventType, filename) {
	// console.log(eventType, filename)
	io.emit('reload')
})
// server.listen(3000);
var aserver = server.listen(config.port, function() {
	var host = aserver.address().address;
	var port = aserver.address().port;
	console.log('App listening at http://%s:%s', host, port);
	doChildprocess();
})

function doChildprocess() {
	var cmdCli = 'fis3 release dev -wl -d ./evcard-datav-vehicle';
	var cpRelease = child_process.exec(cmdCli);
	cpRelease.stdout.pipe(process.stdout);
}