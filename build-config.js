module.exports = function(){
  // re-used within return
  var base = {
      'src'     : 'src/',
      'bin'     : 'bin/',
      'htdocs'  : '../htdocs/',
    },
    paths = {
      'ui'      : 'ui/',
      'js'      : 'ui/js/',
      'css'     : 'ui/css/',
      'scss'    : 'ui/scss',
      'fonts'   : 'ui/fonts/',
      'img'     : 'ui/img/',
      'inc'     : 'inc/',
    },
    rootCSSPath = '/' + paths.css,
    rootJSPath = '/' + paths.js;
  // returned value
  return{
    // ui files by build target
    defaults : {
      'css':[
        ( rootCSSPath + 'reset.css' ),
        ( rootCSSPath + 'sprites.css' ),
        ( rootCSSPath + 'all.css' ),
        ( rootCSSPath + 'test.css' )
      ],
      'js':[
        ( rootJSPath + 'app.js' )
      ]
    },
    debug : {
      'css' : [
        ( rootCSSPath + 'all.css' )
      ],
      'js':[
        ( rootJSPath + 'app.js' )
      ]
    },
    release : {
      'css' : [
        ( rootCSSPath + 'all_min.css' )
      ],
      'js' : [
        ( rootJSPath + 'app_min.js' )
      ]
    },
    // for reference in inticonfig
    base : base,
    paths : paths,
    // files to watch
    watchfiles : [
      // include
      base.src + paths.css + '*.css',
      base.src + paths.css + '**/*.css',
      base.src + paths.js + '*.js',
      base.src + paths.js + '**/*.js',
      base.src + paths.img + 'sprites/*.png',
      base.src + paths.inc + '*.inc',
      base.src + paths.inc + '**/*.inc',
      base.src + '*.jade',
      base.src + '**/*.jade',
      // ignore
      '!' + base.src + paths.css + 'sprites.css',
      '!' + base.src + '*.html',
      '!' + base.src + '**/*.html',
    ]
  }
}