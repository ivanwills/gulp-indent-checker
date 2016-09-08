/* global require */

var gulp   = require('gulp'),
	indent = require('./index');

gulp.task('bad', function () {
	return gulp.src('bad-file.txt')
		.pipe(indent({}));
});

gulp.task('default', function () {
	return gulp.src('*.js')
		.pipe(indent({}));
});
