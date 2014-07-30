# Frontend boilerplate based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) and using [Gulp](http://gulpjs.com/) with a little help from [Grunt](http://gruntjs.com/).

## v 0.0.1 (2014-07-30)

This is a first go at porting my [Grunt based boilerplate](https://github.com/derekjohnson/boilerplate) to Gulp.

### Features

#### HTML
* files built from templates and partials in ./src/ and ./src/parts/

#### CSS
* CSS compiled from Sass in ./src/sass/

#### JS
* concatenated and minified from ./src/js
* JSHint task available

#### Images

##### SVG images

* SVG's in ./src/assets/images optimised using svgmin
* Optimised SVG's rasterised using svg2png
* PNG's optimised using imageoptim and imagealpha

##### Icons

* SVG's in /src/assets/icons optimised using svgmin
* grunticon works its magic on them, saving all relevant files to dist/css

