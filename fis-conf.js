var ejs = require('ejs');
var helpers = require('./build/helpers')
var env = helpers.getBuildEnv()

fis.set('project.ignore', [
    'build/**',
	'*.bak', 
	'*.gitignore', 
	'node_modules/**',
	'package.json', 
	'README.md', 
	'evcard-datav-vehicle/**',
	'component.json',
	'fis-conf.js',
	'fis-push.js',
	'package-lock.json',
	'LICENSE'
]);

fis.match('/{script,components}/**.{js,jsx}', {
  isMod: true
});

fis.match('script/modules/common/views/manager_content.js', {
  isMod: false
});

fis.hook('commonjs');

fis.match('::package', {
    postpackager: fis.plugin('loader')
});

fis.match('{/{script,components}/**.js,*.jsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: true
    }),
    rExt: '.js'
});
fis.media('prod')
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('/html/(*.html)', {
        release: './$1',
        parser: fis.plugin('html-plugin', {
            env: 'prod'
        })
    })
    .match('*.{js,css,png}', {
        domain: '/evcard-datav-vehicle'
    });
//此行以上内容随意改动会引发错误

fis.media('dev').match('*', {

}).match('*.{js,css,png}', {
    useHash: true,
}).match('/html/(*.html)', {
    release: './$1',
    parser: fis.plugin('html-plugin', {
        env: env
    })
    // parser: parserHtml
});

function parserHtml (content, file, settings) {
    if(!file.isHtmlLike) return content;
    return ejs.render(content, {metadata: {env: 'prod'}});
}

