module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    // VARIABLES FOR CONFIG STRING REFERENCE
    build : require('./build-config.js')(),

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
            cwd: '<%= build.base.bin %>',
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
        src:'<%= build.base.src %><%= build.paths.ui %>imagemin/**'
      },
      htdocs:{
        files: [
          {
            expand: true,
            cwd: '<%= build.base.htdocs %>',
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
            cwd: '<%= build.base.src %>',
            src: [
                  '**',
                  // js and css/scss are written to bin by concat/processors
                  '!<%= build.paths.css %>',
                  '!<%= build.paths.css %>*',
                  '!<%= build.paths.css %>**',
                  // '!ui/scss',
                  // '!ui/scss/*',
                  '!<%= build.paths.js %>',
                  '!<%= build.paths.js %>*',
                  // images are copied to bin/ui/img below
                  '!<%= build.paths.img %>**',
                  '!<%= build.paths.ui %>imagemin/**',
                  // includes & jade should be processed and are not needed in releases
                  '!<%= build.paths.inc %>',
                  '!<%= build.paths.inc %>/*',
                  '!*.inc',
                  '!**/*.inc',
                  '!*.jade',
                  '!**/*.jade',
                  // jade should write HTML files to bin
                  '!*.html',
                  '!**/*.html'
            ],
            dest: '<%= build.base.bin %>'
          },
          {
            expand: true,
            cwd: '<%= build.base.src %><%= build.paths.ui %>imagemin/',
            src: [
                  '**'
            ],
            dest: '<%= build.base.bin %><%= build.paths.img %>'
          }
        ]
      },
      to_htdocs: {
        files: [
          {
            expand: true,
            cwd: '<%= build.base.bin %>',
            src: [
                  '**'
            ],
            dest: '<%= build.base.htdocs %>'
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
              '<%= build.base.src %>*.html',
              '<%= build.base.src %>**/*.html',
              '!<%= build.base.src %>*.jade',
              '!<%= build.base.src %>**/*.jade',
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
        src: ['<%= build.base.src %>/**/*.css']
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
                '<%= build.base.src %>/**/*.js',
                '!<%= build.base.src %><%= build.paths.js %>v/*.js'
             ]
      }
  },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   '||'              '||
    ||   ....      .. ||    ....
    ||  '' .||   .'  '||  .|...||
    ||  .|' ||   |.   ||  ||
|| .|'  '|..'|'  '|..'||.  '|...'
 '''

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Create build-specific HTML
    jade: {
      default: {
        files: [
          {
            expand:true,
            cwd: '<%= build.base.src %>',
            src:[
                  '*.jade',
                  '**/*.jade',
                  '!inc/*'
                ],
            dest: '<%= build.base.src %>',
            ext:'.html'
            //rename: jadeToHTML // POJS function -- see var block above
          }
        ],
        options:{
          pretty: true,
          data:{
            js: '<%= build.defaults.js %>',
            css: '<%= build.defaults.css %>'
          }
        }
      },
      debug: {
        files: [
          {
            expand:true,
            cwd: '<%= build.base.src %>',
            src:[
                  '*.jade',
                  '**/*.jade',
                  '!inc/*'
                ],
            dest:'<%= build.base.bin %>',
            ext: '.html'
          }
        ],
        options:{
          pretty: true,
          data:{
            js: '<%= build.debug.js %>',
            css: '<%= build.debug.css %>'
          }
        }
      },
      release: {
        files: [
          {
            expand:true,
            cwd: '<%= build.base.src %>',
            src:[
                  '*.jade',
                  '**/*.jade',
                  '!inc/*'
                ],
            dest:'<%= build.base.bin %>',
            ext: '.html'
          }
        ],
        options:{
          pretty: false,
          data:{
            js: '<%= build.release.js %>',
            css: '<%= build.release.css %>'
          }
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
        src: '<%= build.base.src %><%= build.paths.img %>sprites/*.png',

        // location of compiled sprite sheet
        destImg: '<%= build.base.src %><%= build.paths.img %>spritesheet.png',

        // location on sprite CSS
        destCSS: '<%= build.base.src %><%= build.paths.css %>sprites.css',

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
          cwd:'<%= build.base.src %><%= build.paths.img %>',
          expand:true,
          src:[
                '**',
                '*',
                '!sprites/*',
                '!sprites/**'
          ],
          filter:'isFile',
          dest:'<%= build.base.src %><%= build.paths.ui %>imagemin/'
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
      '<%= build.base.bin %><%= build.paths.js %>app.js': [
                                '<%= build.base.src %><%= build.paths.js %>v/*.js',
                                // if using require.js,
                                // feel free to comment the below line
                                '<%= build.base.src %><%= build.paths.js %>plugins/*.js',
                                '<%= build.base.src %><%= build.paths.js %>/*.js'
                              ],
      // css
      '<%= build.base.bin %><%= build.paths.css %>all.css': [
                                '<%= build.base.src %><%= build.paths.css %>reset.css',
                                '<%= build.base.src %><%= build.paths.css %>fonts.css',
                                '<%= build.base.src %><%= build.paths.css %>sprites.css',
                                '<%= build.base.src %><%= build.paths.css %>*.css',
                                '<%= build.base.src %><%= build.paths.css %>**/*.css'
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
            cwd: '<%= build.base.bin %><%= build.paths.css %>',
            src: ['*.css','**/*.css'],
            dest: '<%= build.base.bin %><%= build.paths.css %>',
            ext: '_min.css'
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
          '<%= build.base.bin %><%= build.paths.js %>app_min.js': ['<%= build.base.bin %><%= build.paths.js %>app.js']
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
        files: '<%= build.watchfiles %>', // POJS array used to DRY -- see var block above
        tasks:['default']
      },
      // debug for non-obfuscated watches
      debug:{
        files: '<%= build.watchfiles %>', // POJS array used to DRY -- see var block above
        tasks:['debug', 'default']
      },
      release:{
        files: '<%= build.watchfiles %>', // POJS array used to DRY -- see var block above
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
      base: '<%= build.base.src %>',
      hostname: '*'
    }
  },
  debug: {
    options: {
      port: 3030,
      base: '<%= build.base.bin %>',
      hostname: '*'
    }
  },
  release: {
    options: {
      port: 3030,
      base: '<%= build.base.bin %>',
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
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Third-party tasks.
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-html'); // HTML linter
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('default', [
                                  'jade:default',
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
                                  'jade:debug'
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
                                  'jade:release',
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