grunt-build
===========

Getting Started:
================

Install node and npm use npm install (may need sudo depending on your setup...)
to get all dependencies installed.

As this is a packaging code project I won't get into support for your nodejs npm or grunt setup here. 

Check these sources if you are having problems:

http://nodejs.org/download/

https://www.npmjs.org/

http://gruntjs.com/getting-started

https://github.com/gruntjs/grunt-cli

http://www.google.com


Commands:
=========

__grunt or grunt dev__ triggers a build to the ../htdocs directory without minification

__grunt prod__ triggers a build to the ../htdocs directory with minification

__watch or watch:dev__ triggers a default build when html, js, css, or sprite files are modified. See the gruntfile for specifics

__watch:prod__ same as above but for the minification build

for additional commands (copy, concat, bake, processhtml, sprite etc.) see the gruntfile


File Structure:
===================
    .
    ├── frontend
    │      └── files
    │           ├── inc
    │           └── ui
    │                ├── css
    │                ├── img
    │                     └── sprites
    │                └── js
    │                     ├── v
    │                     └── plugins
    │
    └── htdocs (output files mirror of src/front-end/files with concatenated js/css)


__frontend/files/inc__ global includes are stored here. These are added statically via bake to files that include them. Grunt is configured to accept these with either .html or .inc extensions.

__frontend/files/ui__ skinning assets and application javascript are stored here

__frontend/files/ui/img__ images consumend by the css as "themeing elements" should live here

__frontend/files/ui/img/sprites__ sprite images housed here are compiled into frontend/files/ui/img/spritesheet.png

__frontend/files/ui/css__ self explanitory. A simple reset is included here for testing. Feel free to replace it if you feel strongly about it. By default all css files here are concatenated and minified. To specify the order these are added to the concatenated file, edit the "Concatenate" portion of the gruntfile. Also, for media specific or "one-off" files, exclude them in the "concatenate" section and add them to the "copy" or "minify" tasks

__frontend/files/ui/js__ javascript directory. Feel free to create additional organization here -- may require some configuration in the gruntfile. By default all js files here are concatenated and uglified. To specify the order these are added to the concatenated file, edit the "Concatenate" portion of the gruntfile. Also, for polyfills or platform/page specific "one-offs", the files will need to be excluded in the "concatenate" section and added to the "copy" or "uglify"

__frontend/files/ui/js/v__ javascript 3rd party libraries and frameworks go here. See above for caveats.

__frontend/files/ui/js/plugins__ javascript plugins for libraries 3rd or 1st party should be here. See above for caveats.

