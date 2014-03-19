#grunt-build
==============

## Getting Started
This configuration requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install the required configuration's plugins with this command:

```shell
npm install
```

Once the plugins have been installed, you can use the following commands from within the root directory


## Commands:

__grunt__ or __grunt default__ triggers spriting, includes and linting within the `files/` directory. The purpose of this command is for local development where optimization would slow down round-trips. Before running a `debug` or `release` build, use this process to verify that all code is error-free and conforms to coding standards.

__grunt debug__ triggers a build to the `../htdocs` directory without minification, but with image optimization. Use these builds for dev server pushes where debugging code would be desirable

__grunt release__ triggers a build to the `../htdocs` directory with minification. Use these builds for stage/test/QA/production releases where the final output of the files is expected.

__watch__ or __watch:default__ triggers __grunt:default__ when html, inc, js, css, or sprite files located where the file structure dictates are modified. See the [gruntfile](Gruntfile.js) for specifics.

No watch is provided for `debug` or `release` builds due to potential failure triggered by long processing times and high numbers of files to copy and image assets to optimize.

for additional commands (`copy`, `concat`, `processhtml`, `sprite` etc.) see the [gruntfile](Gruntfile.js)


## File Structure:
==================

The purpose of this project is to provide a build process within VML's SVN structure. That said, since traditionally the `trunk/htdocs/` folder is deployed, it serves as the output bin folder for this project. When using this code, create a `trunk/frontend` directory and put the contents of the project clone there. The process will then build the deployment code to the `trunk/htdocs` folder.

    .
    ├─ frontend (grunt-build root folder)
    │    ├─ files
    │    │    ├─ inc
    │    │    └─ ui
    │    │       ├─ css
    │    │       ├─ img
    │    │       │   └─ sprites
    │    │       └─ js
    │    │           ├─ v
    │    │           └─ plugins
    │    │
    │    ├─ Gruntfile.js
    │    └─ package.json
    │
    └─ htdocs (output files mirror of src/front-end/files with concatenated js/css)


__`frontend/files/inc`__ Includes are expected to be stored here. These are added statically via processHTML to files that require them. In the interest of quick builds, files that require includes should be named with the extension prefix .inc. For example: `index.inc.html`. Without the prefix, files are not processed. All includes that are referenced regardless of where they are located are referenced from the `files/` directory. So, `inc/scripts.inc` not `files/inc/scripts.inc` or `../../scripts.inc`. output files have `.html` as an extension. __WARNING__ for this realson, be sure not to name HTML files with the same name as files using the `.inc.html` extension. For example `landing_page.inc.html` and `landing_page.html`. Grunt in this case will overwrite `landing_page.html`. All non-`.inc.html.html` files are copied to `../htdocs` in `debug` and `release` builds.

__`frontend/files/ui`__ theming assets (css, images, fonts) and application javascript are stored here. In the interest of separation of theme and content, it is suggested that images as content and multi-media be stored elsewhere. Modify imagemin configuration in the [gruntfile](Gruntfile.js) if needed.

__`frontend/files/ui/img`__ images consumend by the css as "themeing elements" should live here. Images found here will be optimized in `debug` and `release` builds.

__`frontend/files/ui/img/sprites`__ sprite images housed here are compiled into `files/ui/img/spritesheet.png`. This folder is not included in `debug` and `release` builds.

__`frontend/files/ui/css`__ self explanitory. A simple CSS reset is included here for testing. Feel free to replace it if you feel strongly about it. By default all css files here are concatenated and minified. To specify the order these are added to the concatenated file, edit the "Concat" portion of the [gruntfile](Gruntfile.js). Also, for media specific or "one-off" files, exclude them from the "Concat" section and add them to the "Copy" or "Minification" sections.

__`frontend/files/ui/js`__ javascript directory. Feel free to create additional organization here -- may require some configuration in the [gruntfile](Gruntfile.js). By default all js files here are concatenated and uglified. To specify the order these are added to the concatenated file, edit the "Concat" portion of the [gruntfile](Gruntfile.js). Also, for polyfills or platform/page specific "one-offs", the files will need to be excluded in the "Concat" section and added to the "Copy" or "Uglification".

__`frontend/files/ui/js/v`__ javascript 3rd party libraries and frameworks go here. See above for caveats.

__`frontend/files/ui/js/plugins`__ javascript plugins for libraries 3rd or 1st party should be here. See above for caveats.