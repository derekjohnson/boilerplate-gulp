var gulp = require('gulp');

require('gulp-grunt')(gulp, {
  verbose: true
});
var sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  fileInclude = require('gulp-file-include'),
  svgmin = require('gulp-svgmin'),
  svg2png = require('gulp-svg2png'),
  jshint = require('gulp-jshint'),
  serve = require('gulp-serve'),
  inlineSource = require('gulp-inline-source'),
  browserSync = require('browser-sync').create();


// Build HTML
gulp.task('fileInclude', function() {
  gulp.src('src/*.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Inlining
gulp.task('inlineSource', function () {
  return gulp.src('src/*.html')
    .pipe(inlineSource())
    .pipe(gulp.dest('dist'));
});

// Concat & Minify JavaScript
gulp.task('js', function() {
  gulp.src(['src/js/main.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('dist/js'));

  // e.g. for another template's scripts
  /*gulp.src(['src/js/test1.js', 'src/js/test2.js'])
    .pipe(concat('test.js'))
    .pipe(uglify())
    .pipe(rename('test.min.js'))
    .pipe(gulp.dest('dist/js'));*/
});

// JSHint
gulp.task('lint', function() {
  gulp.src(['gulpfile.js', 'Gruntfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Images
gulp.task('svgmin', function() {
  gulp.src('src/assets/images/*.svg')
    .pipe(svgmin([{
      removeViewBox: false
    }]))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('svg2png', function() {
  gulp.src('src/assets/images/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('src/assets/images'));
});

// Copy images
gulp.task('copyimages', function() {
  gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

// Server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: 'dist'
  });

  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/**/*.html', ['fileInclude']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
gulp.task('svg', function() {
  gulp.run('svgmin');
  gulp.run('svg2png');
  gulp.run('grunt-squash');
});

gulp.task('grunticon', ['grunt-icons']);
