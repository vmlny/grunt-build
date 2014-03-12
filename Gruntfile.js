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
      dev:{
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
        dev: {
            files: {
                "files/index.html": "files/index-to-bake.html"
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
      dev: {
        files: {
          "../htdocs/index-dev.html": ["files/index.html"]
        }
      },
      prod: {
        files: {
          "../htdocs/index.html": ["files/index.html"]
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
      dev: {
        files: [
          {
            expand: true,
            cwd: "files/ui/",
            src: [
                  "img/**",
                  "!img/sprites"
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
      dev:{
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
        tasks:'dev'
      },
      prod:{
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
        tasks:'prod'
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

  grunt.registerTask("dev", [
                                  "clean",
                                  "sprite",
                                  "concat",
                                  "bake",
                                  "processhtml:dev",
                                  "copy"
                                ]);
  grunt.registerTask("prod", [
                                  "clean",
                                  "sprite",
                                  "concat",
                                  "cssmin",
                                  "uglify",
                                  "bake",
                                  "processhtml:dev",
                                  "processhtml:prod",
                                  "copy"
                                ]);
};
