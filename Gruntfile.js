module.exports = function(grunt) {
  'use strict';
  var watchfiles = [
        // include
        'src/ui/css/*.css',
        'src/ui/css/**/*.css',
        'src/ui/js/*.js',
        'src/ui/js/**/*.js',
        'src/ui/img/sprites/*.png',
        'src/inc/*.inc',
        'src/inc/**/*.inc',
        'src/*.ghtml',
        'src/**/*.ghtml',
        // ignore
        '!src/ui/css/sprites.css',
        '!src/*.html',
        '!src/**/*.html',
      ],
      ghtmlToHTML = function(dest, src) {
        if( /\.ghtml$/.test(src) ){
            return dest + src.replace(/\.ghtml$/, '.html');
        }
      };
  grunt.initConfig({
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
            cwd: "bin/",
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
        src:'src/ui/imagemin/**'
      },
      htdocs:{
        files: [
          {
            expand: true,
            cwd: '../htdocs/',
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
            cwd: 'src/',
            src: [
                  '**',
                  // js and css/scss are written to bin by concat/processors
                  '!ui/css',
                  '!ui/css/*',
				  '!ui/css/**',
                  // '!ui/scss',
                  // '!ui/scss/*',
                  '!ui/js',
                  '!ui/js/*',
                  // images are copied to bin/ui/img below
                  '!ui/img/**',
                  '!ui/imagemin/**',
                  // includes & ghtml should be processed and are not needed in releases
                  '!inc',
                  '!inc/*',
                  '!*.inc',
                  '!**/*.inc',
                  '!*.ghtml',
                  '!**/*.ghtml',
                  // processHTML/HTMLminification should write HTML files to bin
                  '!*.html',
                  '!**/*.html'
            ],
            dest: 'bin/'
          },
          {
            expand: true,
            cwd: 'src/ui/imagemin/',
            src: [
                  '**'
            ],
            dest: 'bin/ui/img/'
          }
        ]
      },
      to_htdocs: {
        files: [
          {
            expand: true,
            cwd: 'bin/',
            src: [
                  '**'
            ],
            dest: '../htdocs/'
          }
        ]
      },
      no_HTML_min: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
                  '**.html',
                  '**/*.html'
            ],
            dest: 'bin/'
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
              'src/*.html',
              'src/**/*.html',
              '!src/*.ghtml',
              '!src/**/*.ghtml',
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
        src: ['src/**/*.css']
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
                'src/**/*.js',
                '!src/ui/js/v/*.js'
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
            cwd:'src/',
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:'src/',
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:'src/',
          recursive:true
        }
      },
      debug: {
        files: [
          {
            expand:true,
            cwd:'src/',
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:'bin/',
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:'src/',
          recursive:true,
          strip:true
        }
      },
      release: {
        files: [
          {
            expand:true,
            cwd:'src/',
            src:[
                  '*.ghtml',
                  '**/*.ghtml'
                ],
            dest:'bin/',
            rename: ghtmlToHTML // POJS function -- see var block above
          }
        ],
        options:{
          includeBase:'src/',
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
        src: 'src/ui/img/sprites/*.png',

        // location of compiled sprite sheet
        destImg: 'src/ui/img/spritesheet.png',

        // location on sprite CSS
        destCSS: 'src/ui/css/sprites.css',

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
          cwd:'src/ui/img/',
          expand:true,
          src:[
                '**',
                '*',
                '!sprites/*',
                '!sprites/**'
          ],
          filter:'isFile',
          dest:'src/ui/imagemin/'
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
      'bin/ui/js/app.js': [
                                'src/ui/js/v/*.js',
                                // if using require.js,
                                // feel free to comment the below line
                                'src/ui/js/plugins/*.js',
                                'src/ui/js/*.js'
                              ],
      // css
      'bin/ui/css/all.css': [
                                'src/ui/css/reset.css',
                                'src/ui/css/fonts.css',
                                'src/ui/css/sprites.css',
                                'src/ui/css/*.css',
                                'src/ui/css/**/*.css'
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
            cwd: 'bin/ui/css',
            src: ['*.css','**/*.css'],
            dest: 'bin/ui/css',
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
            cwd: 'bin',
            src: ['*.html','**/*.html'],
            dest: 'bin'
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
          'bin/ui/js/app_min.js': ['bin/ui/js/app.js']
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
      base: 'src',
      hostname: '*'
    }
  },
  debug: {
    options: {
      port: 3030,
      base: 'bin',
      hostname: '*'
    }
  },
  release: {
    options: {
      port: 3030,
      base: 'bin',
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
