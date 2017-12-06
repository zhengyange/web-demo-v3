fis.set('project.ignore', [
  'components/**',
  'script/**',
  'node_modules/**',
  'static/**',
  'BACK/**',
  '.git/**',
  '.svn/**',
  '.gitignore',
  'fis-conf.js',
  'fis-push.js',
  'manager.html',
  'package.json',
  'README.md',
]);
fis.media('dev')
  .match('**', {
    release: '$0'
  })
  .match('*', {
    deploy: fis.plugin('http-push', {
      receiver: 'http://192.168.1.110:8999/receiver',
      //远端目录
      to: '/evcard/www/csms'
    })
  })
  
fis.media('test')
	.match('**', {
		release: '$0'
	})
	.match('*', {
    deploy: fis.plugin('http-push', {
      receiver: 'http://139.196.229.140:8999/receiver',
      //远端目录
      to: '/evcard/www/csms'
    })
  })