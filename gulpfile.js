var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var filter = require('gulp-filter');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var notify = require("gulp-notify");

var handleErrors = function() {

    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    this.emit('end');
};

gulp.task('browserify', function(){

    var browserified = transform(function(filename) {
        return browserify(filename, { debug: true })
               .bundle();
    }).on('error', handleErrors);

    return gulp.src(['assets/js/index.js'])
        .pipe(browserified)
        .on('error', handleErrors)
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "dev.dev",
        open: false,
        online: false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function () {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('public/css'))
		.pipe(filter('**/*.css'))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("assets/scss/**/*.scss", ['sass']);
    gulp.watch("assets/js/**/*.js", ['browserify']);
    gulp.watch(["public/*.{php,html}", "app/**/*.php"], ['bs-reload']);
});