module.exports = function(grunt) {
  'use strict';
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
      watchfiles = [
        // include
        base.src + paths.css + '*.css',
        base.src + paths.css + '**/*.css',
        base.src + paths.js + '*.js',
        base.src + paths.js + '**/*.js',
        base.src + paths.img + 'sprites/*.png',
        base.src + paths.inc + '*.inc',
        base.src + paths.inc + '**/*.inc',
        base.src + '*.ghtml',
        base.src + '**/*.ghtml',
        // ignore
        '!' + base.src + paths.css + 'sprites.css',
        '!' + base.src + '*.html',
        '!' + base.src + '**/*.html',
      ],
      ghtmlToHTML = function(dest, src) {
        if( /\.ghtml$/.test(src) ){
            return dest + src.replace(/\.ghtml$/, '.html');
        }
      };
  grunt.initConfig({
    // VARIABLES FOR CONFIG STRING REFERENCE
    base : base,
    paths : paths,

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.| '||
.|'     '   ||    ....   ....   .. ...
||          ||  .|...|| '' .||   ||  ||
'|.      .  ||  ||      .|' ||   ||  ||
 ''|....'  .||.  '|...' '|..'|' .||. ||.

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Wipe out previous builds.
     clean: {
       default: {
        files: [
          {
            expand: true,
            cwd: base.bin,
            src:[
                  "**/*.*",
                  "!**/.svn" // leaves svn directories pre-SVN 1.7
                ]
          }
        ],
        options:{
          'dot': true,
          'nonull': true
          // 'no-write': true
          //force: true
        }
      },
      imagemin:{
        src:'<%= base.src %><%= paths.ui %>imagemin/**'
      },
      htdocs:{
        files: [
          {
            expand: true,
            cwd: base.htdocs,
            src:[
                  '*',
                  "!**/.svn" // leaves svn directories pre-SVN 1.7
                ]
          }
        ],
        options:{
          'dot': true,
          'nonull': true,
          //'no-write': true,
          'force': true
        }
      }
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|
.|'     '    ...   ... ...  .... ...
||         .|  '|.  ||'  ||  '|.  |
'|.      . ||   ||  ||    |   '|.|
 ''|....'   '|..|'  ||...'     '|
                    ||      .. |
                   ''''      ''
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Move assets during builds.
    copy: {
      // default copy copies unadulterated assets to bin then copies minified images
      // This keeps source mostly clear of processed files
      default: {
        files: [
          {
            expand: true,
            cwd: base.src,
            src: [
                  '**',
                  // js and css/scss are written to bin by concat/processors
                  '!<%= paths.css %>',
                  '!<%= paths.css %>*',
                  '!<%= paths.css %>**',
                  // '!ui/scss',
                  // '!ui/scss/*',
                  '!<%= paths.js %>',
                  '!<%= paths.js %>*',
                  // images are copied to bin/ui/img below
                  '!<%= paths.img %>**',
                  '!<%= paths.ui %>imagemin/**',
                  // includes & ghtml should be processed and are not needed in releases
                  '!<%= paths.inc %>',
                  '!<%= paths.inc %>/*',
                  '!*.inc',
                  '!**/*.inc',
                  '!*.ghtml',
                  '!**/*.ghtml',
                  // processHTML/HTMLminification should write HTML files to bin
                  '!*.html',
                  '!**/*.html'
            ],
            dest: base.bin
          },
          {
            expand: true,
            cwd: '<%= base.src %><%= paths.ui %>imagemin/',
            src: [
                  '**'
            ],
            dest: '<%= base.bin %><%= paths.img %>'
          }
        ]
      },
      to_htdocs: {
        files: [
          {
            expand: true,
            cwd: base.bin,
            src: [
                  '**'
            ],
            dest: base.htdocs
          }
        ]
      },
      no_HTML_min: {
        files: [
          {
            expand: true,
            cwd: base.src,
            src: [
                  '**.html',
                  '**/*.html'
            ],
            dest: base.bin
          }
        ]
      }
    },

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||'  '||' |''||''| '||    ||' '||'      '||   ||             .
 ||    ||     ||     |||  |||   ||        ||  ...  .. ...   .||.
 ||''''||     ||     |'|..'||   ||        ||   ||   ||  ||   ||
 ||    ||     ||     | '|' ||   ||        ||   ||   ||  ||   ||
.||.  .||.   .||.   .|. | .||. .||.....| .||. .||. .||. ||.  '|.'

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    htmllint:{
      files:[
              '<%= base.src %>*.html',
              '<%= base.src %>**/*.html',
              '!<%= base.src %>*.ghtml',
              '!<%= base.src %>**/*.ghtml',
        ],
        options:{
          force: true // don't break build for SEO enfoced standards breakage
        }
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|  .|'''.|   .|'''.|     '||'       ||             .
.|'     '   ||..  '   ||..  '      ||       ...  .. ...   .||.
||           ''|||.    ''|||.      ||        ||   ||  ||   ||
'|.      . .     '|| .     '||     ||        ||   ||  ||   ||
 ''|....'  |'....|'  |'....|'     .||.....| .||. .||. ||.  '|.'

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    csslint: {
      default: {
        options: {
          import: 2,
          // lax csslint for spritesheet
          'important': false,
          'adjoining-classes': false,
          'known-properties': false,
          'box-sizing': false,
          'box-model': false,
          'overqualified-elements': false,
          'display-property-grouping': false,
          'bulletproof-font-face': false,
          'compatible-vendor-prefixes': false,
          'regex-selectors': false,
          'errors': true,
          'duplicate-background-images': false,
          'duplicate-properties': false,
          'empty-rules': false,
          'selector-max-approaching': false,
          'gradients': false,
          'fallback-colors': false,
          'font-sizes': false,
          'font-faces': false,
          'floats': false,
          'star-property-hack': false,
          'outline-none': false,
          'ids': false,
          'underscore-property-hack': false,
          'rules-count': false,
          'qualified-headings': false,
          'selector-max': false,
          'shorthand': false,
          'text-indent': false,
          'unique-headings': false,
          'universal-selector': false,
          'unqualified-attributes': false,
          'vendor-prefix': false,
          'zero-units': false
        },
        src: ['<%= base.src %>/**/*.css']
      }
  },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   ||        '||'  '||'  ||             .
  ...  ....   ||    ||  ...  .. ...   .||.
   || ||. '   ||''''||   ||   ||  ||   ||
   || . '|..  ||    ||   ||   ||  ||   ||
   || |'..|' .||.  .||. .||. .||. ||.  '|.'
.. |'
 ''

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    jshint: {
      default: {
        options: {
          eqeqeq: true,
          curly: true,
          forin: true,
          immed: true,
          nonbsp: true,
          undef:true,
          trailing:true,
          //smarttabs:true,

          // relaxing
          gcl:true,
          laxcomma:true,
          supernew:true,

          // global environment vars
          jquery: true,
          dojo:true,
          prototypejs:true,
          browser:true,
          nonstandard:true
        },
        src: [
                '<%= base.src %>/**/*.js',
                '!<%= base.src %><%= paths.js %>v/*.js'
             ]
      }
  },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||''|.
 ||   || ... ..    ...     ....    ....   ....   ....
 ||...|'  ||' '' .|  '|. .|   '' .|...|| ||. '  ||. '
 ||       ||     ||   || ||      ||      . '|.. . '|..
.||.     .||.     '|..|'  '|...'  '|...' |'..|' |'..|'


'||'  '||' |''||''| '||    ||' '||'
 ||    ||     ||     |||  |||   ||
 ||''''||     ||     |'|..'||   ||
 ||    ||     ||     | '|' ||   ||
.||.  .||.   .||.   .|. | .||. .||.....|

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Create build-specific HTML
    processhtml: {
      default: {
        files: [
          {
            expand:true,
            cwd:base.src,
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:base.src,
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:base.src,
          recursive:true
        }
      },
      debug: {
        files: [
          {
            expand:true,
            cwd:base.src,
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:base.bin,
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:base.src,
          recursive:true,
          strip:true
        }
      },
      release: {
        files: [
          {
            expand:true,
            cwd:base.src,
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:base.bin,
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:base.src,
          recursive:true,
          strip:true
        }
      },
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 .|'''.|                    ||    .
 ||..  '  ... ...  ... ..  ...  .||.    ....
  ''|||.   ||'  ||  ||' ''  ||   ||   .|...||
.     '||  ||    |  ||      ||   ||   ||
|'....|'   ||...'  .||.    .||.  '|.'  '|...'
           ||
          ''''
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // create spritesheet and CSS
    sprite: {
      default: {
        // location of individual images
        src: '<%= base.src %><%= paths.img %>sprites/*.png',

        // location of compiled sprite sheet
        destImg: '<%= base.src %><%= paths.img %>spritesheet.png',

        // location on sprite CSS
        destCSS: '<%= base.src %><%= paths.css %>sprites.css',

        // image arrangement algorithm
        algorithm: 'diagonal',

        // PNG processing engine (this one does not require additional installation)
        engine: 'pngsmith',

        //custom path for the css file to point to the image
        // imgPath:'../img/spritesheet.png',

        cssOpts: {
          // used for CSS class naming
          'cssClass': function(item) {
            var name = item.name;
            name = name.replace(/^_/, '.');
            name = name.replace(/\^/g, ':');
            return name;
          }
        }
      }
    },
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||'                                    '||    ||'  ||
 ||  .. .. ..    ....     ... .   ....   |||  |||  ...  .. ...
 ||   || || ||  '' .||   || ||  .|...||  |'|..'||   ||   ||  ||
 ||   || || ||  .|' ||    |''   ||       | '|' ||   ||   ||  ||
.||. .|| || ||. '|..'|'  '||||.  '|...' .|. | .||. .||. .||. ||.
                        .|....'

ham-fisted image optimization
manual optimization is preferable for non-png sources as compression effects
images based factors like edge contrast and color depth specific to each image
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  imagemin:{
      default:{
        files:[{
          cwd:'<%= base.src %><%= paths.img %>',
          expand:true,
          src:[
                '**',
                '*',
                '!sprites/*',
                '!sprites/**'
          ],
          filter:'isFile',
          dest:'<%= base.src %><%= paths.ui %>imagemin/'
        }],
        options:{
          optimizationlevel:3,
          pngquant:true,
          progressive:false, // historical spotty support on Mozilla
          force:true
        }
      }
  },

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|                                    .
.|'     '    ...   .. ...     ....   ....   .||.
||         .|  '|.  ||  ||  .|   '' '' .||   ||
'|.      . ||   ||  ||  ||  ||      .|' ||   ||
 ''|....'   '|..|' .||. ||.  '|...' '|..'|'  '|.'


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // concatenate js and css files here to allow for greater control of order
    concat: {
      // JS files
      '<%= base.bin %><%= paths.js %>app.js': [
                                '<%= base.src %><%= paths.js %>v/*.js',
                                // if using require.js,
                                // feel free to comment the below line
                                '<%= base.src %><%= paths.js %>plugins/*.js',
                                '<%= base.src %><%= paths.js %>/*.js'
                              ],
      // css
      '<%= base.bin %><%= paths.css %>all.css': [
                                '<%= base.src %><%= paths.css %>reset.css',
                                '<%= base.src %><%= paths.css %>fonts.css',
                                '<%= base.src %><%= paths.css %>sprites.css',
                                '<%= base.src %><%= paths.css %>*.css',
                                '<%= base.src %><%= paths.css %>**/*.css'
                              ]
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||    ||'  ||            ||    .'|.  ||                    .    ||
 |||  |||  ...  .. ...   ...  .||.   ...    ....   ....   .||.  ...    ...   .. ...
 |'|..'||   ||   ||  ||   ||   ||     ||  .|   '' '' .||   ||    ||  .|  '|.  ||  ||
 | '|' ||   ||   ||  ||   ||   ||     ||  ||      .|' ||   ||    ||  ||   ||  ||  ||
.|. | .||. .||. .||. ||. .||. .||.   .||.  '|...' '|..'|'  '|.' .||.  '|..|' .||. ||.

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Minfiy the release CSS. +++++++++++++++++++++
    cssmin: {
      release: {
        files:[{
          expand: true,
            cwd: '<%= base.bin %><%= paths.css %>',
            src: ['*.css','**/*.css'],
            dest: '<%= base.bin %><%= paths.css %>',
            ext: '_min.css'
        }]
      }
    },
    //Minfiy html for release ++++++++++++++++++++++
    htmlmin:{
      release:{
        options:{
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS:true
        },
        files:[{
          expand: true,
            cwd: base.bin,
            src: ['*.html','**/*.html'],
            dest: base.bin
        }]
      }
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||'  '|'         '||   ||    .'|.  ||                    .    ||
 ||    |    ... .  ||  ...  .||.   ...    ....   ....   .||.  ...    ...   .. ...
 ||    |   || ||   ||   ||   ||     ||  .|   '' '' .||   ||    ||  .|  '|.  ||  ||
 ||    |    |''    ||   ||   ||     ||  ||      .|' ||   ||    ||  ||   ||  ||  ||
  '|..'    '||||. .||. .||. .||.   .||.  '|...' '|..'|'  '|.' .||.  '|..|' .||. ||.
          .|....'

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Uglify the distribution JS.
    uglify:{
      release: {
        files: {
          '<%= base.bin %><%= paths.js %>app_min.js': ['<%= base.bin %><%= paths.js %>app.js']
        },
        options:{
          sourceMap:true
        }
      }
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'|| '||'  '|'           .           '||
 '|. '|.  .'   ....   .||.    ....   || ..
  ||  ||  |   '' .||   ||   .|   ''  ||' ||
   ||| |||    .|' ||   ||   ||       ||  ||
    |   |     '|..'|'  '|.'  '|...' .||. ||.

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    watch:{
      // default for dev watches
      default:{
        files: watchfiles, // POJS array used to DRY -- see var block above
        tasks:['default']
      },
      // debug for non-obfuscated watches
      debug:{
        files:watchfiles, // POJS array used to DRY -- see var block above
        tasks:['debug', 'default']
      },
      release:{
        files:watchfiles, // POJS array used to DRY -- see var block above
        tasks:['release', 'default']
      }
},

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|                                             .
.|'     '    ...   .. ...   .. ...     ....    ....  .||.
||         .|  '|.  ||  ||   ||  ||  .|...|| .|   ''  ||
'|.      . ||   ||  ||  ||   ||  ||  ||      ||       ||
 ''|....'   '|..|' .||. ||. .||. ||.  '|...'  '|...'  '|.'

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
connect: {
  default: {
    options: {
      port: 3000,
      base: base.src,
      hostname: '*'
    }
  },
  debug: {
    options: {
      port: 3030,
      base: base.bin,
      hostname: '*'
    }
  },
  release: {
    options: {
      port: 3030,
      base: base.bin,
      hostname: '*'
    }
  }
}
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

|''||''|                '||
   ||     ....    ....   ||  ..   ....
   ||    '' .||  ||. '   || .'   ||. '
   ||    .|' ||  . '|..  ||'|.   . '|..
  .||.   '|..'|' |'..|' .||. ||. |'..|'
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  // Grunt contribution tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Third-party tasks.
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('default', [
                                  'processhtml:default',
                                  'sprite',
                                  'htmllint',
                                  // css preprocessors go here
                                  'csslint',
                                  // coffeescript, DART, ES6 preprocessors go here
                                  'jshint'
                                ]);
  grunt.registerTask('debug', [
                                  'clean:default',
                                  'sprite',
                                  'imagemin',
                                  'copy',
                                  'clean:imagemin',
                                  // css preprocessors go here
                                  'concat',
                                  'processhtml:debug'
                                ]);
  grunt.registerTask('release', [
                                  'clean:default',
                                  'sprite',
                                  'imagemin',
                                  'copy',
                                  'clean:imagemin',
                                  // css preprocessors go here
                                  'concat',
                                  'cssmin',
                                  'uglify',
                                  'processhtml:release',
                                  // toggle comments to add/remove HTML minification (for Wes)
                                  'htmlmin:release',
                                  // uncomment below to build to htdocs in SVN filescheme
                                  // 'clean:htdocs',
                                  //'copy:to_htdocs'
                                ]);
  grunt.registerTask('server', '', function(_subTask){
    switch(_subTask){
      case 'debug':
        grunt.task.run([
                          'connect:default',
                          'connect:debug',
                          'watch:debug'
                       ]);
      break;
      case 'release':
        grunt.task.run([
        'connect:default',
                          'connect:release',
                          'watch:release',
                       ]);
      break;
      default:
        grunt.task.run([
                          'connect:default',
                          'watch:default'
                       ]);
      break;
    }
  });
};