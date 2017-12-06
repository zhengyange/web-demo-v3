function getEnv() {
  var argv = process.argv;
  var env = argv[argv.length - 1];
  return env.substr(2) || 'dev'
}
exports.getBuildEnv = function() {
  return getEnv();
}

exports.getProxyTarget = function() {
  let env = getEnv();
  let proxyTarget = 'http://10.20.130.23:8082'; //此ip需要连vpn
  proxyTarget = 'http://bigdata.evcard.vip/' //大数据的外网映射
  proxyTarget = 'http://csms-test.evcard.vip/' //大数据的外网映射

  if (env == 'test') {
    proxyTarget = 'http://csms-test.evcard.vip/'
  }
  return proxyTarget;
}