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
        files:[
          {
            src:[
                  "../htdocs/ui/**",
                  "../htdocs/content/**",
                  "../htdocs/svc/**"
                ],
            filter:"isFile"
          }
        ],
        options:{
          force: true
        }
      }
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
      all: {
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
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ..|'''.|                                    .                              .           
.|'     '    ...   .. ...     ....   ....   .||.    ....  .. ...    ....   .||.    ....  
||         .|  '|.  ||  ||  .|   '' '' .||   ||   .|...||  ||  ||  '' .||   ||   .|...|| 
'|.      . ||   ||  ||  ||  ||      .|' ||   ||   ||       ||  ||  .|' ||   ||   ||      
 ''|....'   '|..|' .||. ||.  '|...' '|..'|'  '|.'  '|...' .||. ||. '|..'|'  '|.'  '|...' 
                                                                                                                                                                             

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

'||''|.           '||              
 ||   ||   ....    ||  ..    ....  
 ||'''|.  '' .||   || .'   .|...|| 
 ||    || .|' ||   ||'|.   ||      
.||...|'  '|..'|' .||. ||.  '|...' 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    // bake in includes
    bake: {
        build: {
            files: {
                "files/index-baked.html": "files/index.html"
            }
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
        files: {
          "../htdocs/index-dev.html": ["files/index-baked.html"]
        }
      },
      build: {
        files: {
          "../htdocs/index.html": ["files/index-baked.html"]
        }
      },
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
            cwd: "files/ui/",
            src: [
                  "img/**",
                  "fonts/**",
                  "css/**",
                  "js/**"
            ],
            dest: "../htdocs/ui/"
          },
          {
            expand: true,
            cwd: "files/content/",
            src: [
                  "data/**",
                  "media/**"
            ],
            dest: "../htdocs/content/"
          },
          {
            expand: true,
            cwd: "files/svc/",
            src: [
                  "readme.md"
            ],
            dest: "../htdocs/svc/"
          }
        ]
      }
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
                'files/ui/js/*.js',
                'files/ui/js/**/*.js',
                'files/inc/**.inc',
                'files/inc/**/*.inc',
                'files/**.html',
                'files/ui/img/sprites/*.png'
              ],
        tasks:['default']
      },
      build:{
        files:[
                'files/ui/css/*.css',
                'files/ui/js/*.js',
                'files/ui/js/**/*.js',
                'files/inc/**.inc',
                'files/inc/**/*.inc',
                'files/**.html',
                'files/ui/img/sprites/*.png'
              ],
        tasks:['build']
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
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-bake");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask("default", [
                                  "clean",
                                  "sprite",
                                  "concat",
                                  "bake",
                                  "processhtml:default",
                                  "copy"
                                ]);
  grunt.registerTask("build", [
                                  "clean",
                                  "sprite",
                                  "concat",
                                  "bake",
                                  "cssmin",
                                  "uglify",
                                  "processhtml:build",
                                  "copy"
                                ]);
};
