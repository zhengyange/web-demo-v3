var path = require('path');
var helpers = require('./helpers.js');
var build_env = helpers.getBuildEnv();
var proxyTarget = helpers.getProxyTarget();
module.exports = {
	assetsPublicPath: './web-demo-v3',
	assetsRoot: path.resolve(__dirname, '../web-demo-v3'),
	port: '8081',
	proxyTable: {
		'/web-demo-v3/api': {
	        target: proxyTarget,
	        changeOrigin: true,
	        pathRewrite: {
	          '^/web-demo-v3/api': '/web-demo-v3/api'
	        }
	    },
	}
}