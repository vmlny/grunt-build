#grunt-build
==============

## Getting Started
This configuration requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install the required configuration's plugins with this command:

```shell
npm install
```

Once the plugins have been installed, you can use the following commands from within the root directory

## Build Targets:

__default__ The source code. Generally this coinsides with the `src/` directory. Code here is in it's least modified usable form. Transpiling should be done here, but no concatenation or minification. Most general development will be done for this build target as the location of code in source styling and logic files should be direct.

__release__ The production code. Generally this is in the `bin/` directory. Code here should be a flat and small as possible.

__debug__ The pre-production code. Though this is built to the `bin/` directory, this code should never be deployed. The primary purpose of this build target is to troubleshoot concatenation related errors obscured by minification that can't be reproduced in `default`.

## Commands (overview):

__`grunt [build-target]`__ creates a build based on the build-target:

  * __default__ triggers spriting, includes and linting all within the `src/` directory. The purpose of this command is for local development where optimization would slow down round-trips and concatenation would slow down debugging. Linting is included in this build-target. Before pushing code from a `debug` or `release` build, use this process to verify that all code is error-free and conforms to coding standards. For linting/validation configuration options, see: [jshint](http://www.jshint.com/docs/options/), [cssLint](https://github.com/stubbornella/csslint/wiki/Rules), [HTML Validator](https://www.npmjs.org/package/grunt-html-validation).

  * __debug__ triggers a build to the `/bin` directory __without__ minification, but with image optimization. Use these builds to troubleshoot broken release builds.

  * __release__ triggers a build to the `/bin` directory __with__ minification. Use these builds for stage/test/QA/production releases where the final output of the files is expected/desired.

__`grunt watch:[build-target]`__ triggers `grunt [build-target]` when `.ghtml`, `.inc`, `.js`, `.css`, or sprite files located in the appropriate folders are modified. The watchfiles are specified in a variable at the top of the gruntfile.

Basically grunt watches for changes to `.ghtml` files anywhere in `src/` and `.inc` inside of `src/inc/` or any subfolder therein. `.css` and `.js` files are watched when located below their respective `src/ui/css/` or `src/ui/js/` directories. Sprite images can trigger a buid if added or changed within the sprite directory (`src/ui/img/sprites/`)

See the [gruntfile](Gruntfile.js) for more specifics or to modify these filenames etc.

__`grunt server[build-target]`__ Runs a webserver and watch simultaneously with slight differences based on the build-target

  * __default__ runs the default watch and creates an http server on localhost:3000 with it's root in the `src` directory. The intention of this process is for development providing linting, spriting and serving without the overhead of image optimization and the translation of concatenation or obfuscation

  * __debug__ runs the `debug` watch alongside `default` watch and creates http servers: one for the `debug` build on localhost:3030 with it's root in `../bin` directory and one for the `default` build on port 3000 as above.

  * __release__ runs the `release` watch alongside `default` watch and creates http servers: one for the `release` build on localhost:3030 with it's root in `../bin` directory and one for the `default` build on port 3000 as above.

for additional commands (`copy`, `concat`, `processhtml`, `sprite` etc.) see the [gruntfile](Gruntfile.js)


## File Structure:
==================

The purpose of this project has been to provide a build process within VML's SVN structure.
Due to the disclusion of the htdocs folder the build process is conflated and confusing to newcomers. Therefore, builds are made to a bin folder that is then able to be copied into the `../htdocs` folder via `grunt copy:to_htdocs` or by uncommenting this line in the `release` task.

When using this code, create a `trunk/frontend` directory in your SVN checkout and put the contents of this project clone there. The process will then build the deployment code to the `trunk/frontend/bin` folder and will then copy to the `trunk/htdocs` folder through the use of the code above.

    .
    ├─ frontend (grunt-build root folder)
    │    ├─ src
    │    │    ├─ inc
    │    │    └─ ui
    │    │       ├─ css
    │    │       ├─ img
    │    │       │   └─ sprites
    │    │       └─ js
    │    │           ├─ v
    │    │           └─ plugins
    │    ├─ bin (output files mirror of `front-end/src` with concatenated js & css)
    │    │
    │    ├─ Gruntfile.js
    │    └─ package.json
    │
    └─ htdocs (`grunt copy:to_htdocs` will produce a copy of `frontend/bin` here)


__`frontend/src/inc`__ Includes are expected to be stored here. These are added statically via processHTML to files that require them. In the interest of simplicity, files that require includes should be named with the extension .ghtml. For example: `index.ghtml`. The `.ghtml` extension (for grunt parsed HTML) was invented to follow the precident of `.shtml` (or server-parsed HTML). Without this extension, include deendencies are not processed by default configuration.

Includes can have whatever extension you desire, however, the convention has been to call name them with the `.inc` extension. If you wish to use a different extension remember to change the extension in the `watchfiles` variable to get `watch` to register the files.

All includes that are referenced regardless of where they are located are referenced from the `src/` directory. So, `inc/scripts.inc` not `src/inc/scripts.inc` or `../../scripts.inc`. Output files have `.html` as an extension. __WARNING__ for this reason, be sure not to name custom unparsed HTML files with the same name as files using the `.ghtml` extension. For example `landing_page.ghtml` and `landing_page.html`. Grunt in this case will overwrite `landing_page.html`. All non-`.ghtml.html` files are copied to `bin` in `release` builds either by copy or by htmlmin.

__`frontend/src/ui`__ theming assets (css, images, fonts) and application javascript are stored here. In the interest of separation of theme and content, it is suggested that images as content and multi-media be stored elsewhere. Modify imagemin configuration in the [gruntfile](Gruntfile.js) if needed.

__`frontend/src/ui/img`__ images consumend by the css as "themeing elements" should live here. Images found here will be optimized in `debug` and `release` builds.

__`frontend/src/ui/img/sprites`__ sprite images housed here are compiled into `src/ui/img/spritesheet.png`. This folder is not included in `debug` and `release` builds.

__`frontend/src/ui/css`__ self explanitory. A simple CSS reset is included here for testing. Feel free to replace it if you feel strongly about it. By default all css files here are concatenated and minified. To specify the order these are added to the concatenated file, edit the "Concat" portion of the [gruntfile](Gruntfile.js). Also, for media specific or "one-off" files, exclude them from the "Concat" section and add them to the "Copy" or "Minification" sections.

__`frontend/src/ui/js`__ javascript directory. Feel free to create additional organization here -- may require some configuration in the [gruntfile](Gruntfile.js). By default all js files here are concatenated and uglified. To specify the order these are added to the concatenated file, edit the "Concat" portion of the [gruntfile](Gruntfile.js). Also, for polyfills or platform/page specific "one-offs", the files will need to be excluded in the "Concat" section and added to the "Copy" or "Uglification".

__`frontend/src/ui/js/v`__ javascript 3rd party libraries and frameworks go here. See above for caveats.

__`frontend/src/ui/js/plugins`__ javascript plugins for libraries 3rd or 1st party should be here. See above for caveats. For convenience there is a commented suggestion in the [gruntfile](Gruntfile.js) to ignore concating the `src/ui/js/plugins` directory when using require for instance.

## Spriting:

Name the image files the same as the selectors they will be used for. the grunt spritesmith task will use this to generate the CSS selector for each sprite. for instance `a.nav-item.png` will become
```css
a.nav-item{
    background-image:...
}
```
To avoid file-system restrictions, in order to start a selector with a class name, use an underscore `_` instead of a dot `.` ONLY IN THE BEGINNING i.e. for the selector: `.class1 .class2` name your .png: `_class1 .class2.png`.

Likewise, for pseudo classes, use a carat `^` in the filename instead of a colon `:`. For the selector: `a:hover` use: `a^hover.png`. In *nix environments colons are permitted in filenames, however this is forbidden in Windows and is generally confusing when using a network protocol (SSH/FTP etc.).

## UPDATES
==========

Many things have changed in this build.

  * A server running on port 3000 or 3030 has been added in coordination with the watch so a single process can allow watch and serve files.
  * HTML minification has been added as an option
  * CSS Liniting has been laxed to break builds almost only on syntax errors
  * Builds happen within the project filesystem to allow for more flexibility project-to-project

Several breaking changes have occurred in this version due to a reorganization of the folder structure for a clearer build path. Additionally the naming of include-bearing html files has changed as well. See below:

  * Renamed the folders so there is a `src/` and `bin/`. release will include a copy to the `../htdocs/` directory if desired, but the server will run from the bin to keep the build process independent of SysOps/WebOps SVN structure and allowing us to experiment with changes locally without affecting the `../htdocs` directory.
  * CSS Minification allows a "backdoor" to creating multiple HTTP requests and the copy is placing unminified css in the release package -- worth considering changing. I applaud the flexibility in file naming, but the postfix ("_min.css") is still appended to the name, making flexibility slightly less helpful. Additionally the debug and release comments in the default code has the old hard-coded names ('all.css' and 'all_min.css'). So, this could change in the future.
  * Need to revisit the need to have a debug watch. The purpose of debug (and it's subsequent demand) should not require more than an occasional one-off build. The server entry does make sense as the files will need to be served to be viewed without configuring Apache/IIS/nginx.
  * ProcessHTML modified so all tasks build from .ghtml (not .inc.html -- who wants to type all that???)
  * debug builds HTML to the bin folder and release and dev both build HTML to the src folder so that HTMLminification can produce the html files in the bin.
  * Fixed inconsistent quotes
  * Added additional laxing in CSS Linter
  * Provided a COPY related booby hatch for production code in the event Wes needs to be able to read the code.
  * Removed "Chrome=1" from X-UA-Compatible meta since support for chromeframe is not often requested and the longer form of the content value fails W3C Validation. The project should pass validation out-of-the-box and features like chromeframe shuld be on a per-project basis