var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');
	fileinclude = require('gulp-file-include');
	svgmin = require('gulp-svgmin');
	svg2png = require('gulp-svg2png');

require('gulp-grunt')(gulp, {
	base: null,
	prefix: 'grunt-',
	verbose: true
});

// Build HTML
gulp.task('fileinclude', function() {
	gulp.src('src/*.html')
		.pipe(fileinclude())
		.pipe(gulp.dest('dist'))
});

// Compile Sass
gulp.task('sass', function() {
	gulp.src('src/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
});

// Concat & Minify JavaScript
gulp.task('js', function() {
	gulp.src(['src/js/main.js', 'src/js/fonts.js'])
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename('script.min.js'))
		.pipe(gulp.dest('dist/js'));

	gulp.src(['src/js/test1.js', 'src/js/test2.js'])
		.pipe(concat('test.js'))
		.pipe(uglify())
		.pipe(rename('test.min.js'))
		.pipe(gulp.dest('dist/js'));
});

// Images
gulp.task('svgmin', function() {
	gulp.src('src/assets/images/*.svg')
		.pipe(svgmin([{
			removeViewBox: false
		}]))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('svg2png', function() {
	gulp.src('dist/images/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('dist/images'))
});

// Watch files
gulp.task('watch', function() {
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/**/*.html', ['fileinclude']);
});

gulp.task('default', ['fileinclude', 'sass', 'js']);
gulp.task('img', function() {
	gulp.run('svgmin');
	gulp.run('grunt-grunticon:prod');
	gulp.run('svg2png');
	gulp.run('grunt-imageoptim:prod');
});
