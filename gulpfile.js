/* global require */

var gulp   = require('gulp'),
	indent = require('./index');

gulp.task('bad', function () {
	return gulp.src(['*.js', 'bad-file.txt'])
		.pipe(indent({}))
		.pipe(indent.reporter())
		.pipe(indent.failOnError());
});

gulp.task('default', function () {
	return gulp.src('*.js')
		.pipe(indent({}))
		.pipe(indent.reporter())
		.pipe(indent.failOnError());
});
