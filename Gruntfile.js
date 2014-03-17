module.exports = function(grunt) {
  "use strict";
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
      default:{
        src:[
              "../htdocs/*.html",
              "../htdocs/**/*.html",
              "../htdocs/ui"
        ],
        options:{
          force: true
        }
      },
      imagemin:{
        src:'files/ui/imagemin/**'
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
      default: {
        files: [
          {
            expand: true,
            cwd: "files/",
            src: [
                  "**",
                  "!ui/img/**",
                  "!ui/imagemin/**",
                  "!inc",
                  "!*.inc",
                  "!**/*.inc",
                  "!*.html",
                  "!**/*.html"
            ],
            dest: "../htdocs/"
          },
          {
            expand: true,
            cwd: "files/ui/imagemin/",
            src: [
                  "**"
            ],
            dest: "../htdocs/ui/img/"
          }
        ]
      }
    },

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||'  '||' |''||''| '||    ||' '||'                                       
 ||    ||     ||     |||  |||   ||                                        
 ||''''||     ||     |'|..'||   ||                                        
 ||    ||     ||     | '|' ||   ||                                        
.||.  .||.   .||.   .|. | .||. .||.....|                                  
                                                                          
                                                                          
'||'  '|'         '||   ||       '||            .    ||                   
 '|.  .'   ....    ||  ...     .. ||   ....   .||.  ...    ...   .. ...   
  ||  |   '' .||   ||   ||   .'  '||  '' .||   ||    ||  .|  '|.  ||  ||  
   |||    .|' ||   ||   ||   |.   ||  .|' ||   ||    ||  ||   ||  ||  ||  
    |     '|..'|' .||. .||.  '|..'||. '|..'|'  '|.' .||.  '|..|' .||. ||. 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    validation:{
      files:[
              'files/*.html',
              'files/**/*.html',
              '!files/*.inc.html',
              '!files/**/*.inc.html',
        ],
        options:{
          reset:true,
          relaxerror:[],
          reportpath:false
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
          import: 2
        },
        src: ['files/**/*.css']
      }
  },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|  .|'''.|   .|'''.|     '||'       ||             .   
.|'     '   ||..  '   ||..  '      ||       ...  .. ...   .||.  
||           ''|||.    ''|||.      ||        ||   ||  ||   ||   
'|.      . .     '|| .     '||     ||        ||   ||  ||   ||   
 ''|....'  |'....|'  |'....|'     .||.....| .||. .||. ||.  '|.' 

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
        src: ['files/**/*.js', '!files/ui/v/*.js']
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
      include: {
        files: [
          {
            expand:true,
            cwd:'files/',
            src:[
                  '*.inc.html',
                  '**/*.inc.html'
                ],
            dest:'files/',
            rename: function(dest, src) {
              if( /\.inc\.html$/.test(src) ){
                  return dest + src.replace(/\.inc\.html$/, '.html');
              }
            }
          }
        ],
        options:{
          includeBase:'files/',
          recursive:true
        }
      },
      debug: {
        files: [
          {
            expand:true,
            cwd:'files/',
            src:[
                  '*.html',
                  '**/*.html',
                  '!*.inc.html',
                  '!**/*.inc.html'
                ],
            dest:'../htdocs/'
          }
        ],
        options:{
          strip:true
        }
      },
      release: {
        files: [
          {
            expand:true,
            cwd:'files/',
            src:[
                  '*.html',
                  '**/*.html',
                  '!*.inc.html',
                  '!**/*.inc.html'
                ],
            dest:'../htdocs/'
          }
        ],
        options:{
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
        src: 'files/ui/img/sprites/*.png',

        // location of compiled sprite sheet
        destImg: 'files/ui/img/spritesheet.png',
        
        // location on sprite CSS
        destCSS: 'files/ui/css/sprites.css',

        // image arrangement algorithm
        algorithm: 'diagonal',

        // PNG processing engine (this one does not require additional installation)
        engine: 'pngsmith',

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
          cwd:'files/ui/img/',
          expand:true,
          src:[
                "**",
                "*",
                "!sprites/*",
                "!sprites/**"
          ],
          filter:'isFile',
          dest:'files/ui/imagemin/'
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
      "../htdocs/ui/js/app.js": [
                                "files/ui/js/v/*.js",
                                "files/ui/js/plugins/*.js",
                                "files/ui/js/*.js"
                              ],
      // css
      "../htdocs/ui/css/all.css": [
                                "files/ui/css/*.css"
                              ]
    },
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

'||    ||'  ||            ||    .'|.  ||                    .    ||                   
 |||  |||  ...  .. ...   ...  .||.   ...    ....   ....   .||.  ...    ...   .. ...   
 |'|..'||   ||   ||  ||   ||   ||     ||  .|   '' '' .||   ||    ||  .|  '|.  ||  ||  
 | '|' ||   ||   ||  ||   ||   ||     ||  ||      .|' ||   ||    ||  ||   ||  ||  ||  
.|. | .||. .||. .||. ||. .||. .||.   .||.  '|...' '|..'|'  '|.' .||.  '|..|' .||. ||. 
                                                                                      
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // Minfiy the distribution CSS.
    cssmin: {
      release: {
        files: {
          "../htdocs/ui/css/all_min.css": ["../htdocs/ui/css/all.css"]
        }
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
          '../htdocs/ui/js/app_min.js': ['../htdocs/ui/js/app.js']
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
      default:{
        files:[
                'files/ui/css/*.css',
                '!files/ui/css/sprites.css',
                'files/ui/js/*.js',
                'files/ui/js/**/*.js',
                'files/inc/**.inc',
                'files/inc/**/*.inc',
                'files/**.html',
                '!files/index.html',
                'files/ui/img/sprites/*.png'
              ],
        tasks:'default'
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
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-html-validation');


  grunt.registerTask("default", [
                                  "processhtml:include",
                                  "validation",
                                  "csslint",
                                  "jshint",
                                  "sprite"
                                ]);
  grunt.registerTask("debug", [
                                  "clean",
                                  "sprite",
                                  "imagemin",
                                  "copy",
                                  "clean:imagemin",
                                  "concat",
                                  "processhtml:include",
                                  "processhtml:debug"
                                ]);
  grunt.registerTask("release", [
                                  "clean",
                                  "sprite",
                                  "imagemin",
                                  "copy",
                                  "concat",
                                  "cssmin",
                                  "uglify",
                                  "processhtml:include",
                                  "processhtml:release"
                                ]);
};
