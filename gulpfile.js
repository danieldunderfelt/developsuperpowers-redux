var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var filter = require('gulp-filter');
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
    gulp.watch("public/js/**/*.js", ['bs-reload']);
    gulp.watch(["public/*.{php,html}", "app/**/*.php"], ['bs-reload']);
});