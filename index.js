/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	indent      = require('indent-checker'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-indent-checker';

module.exports = function (options) {
	var stream = through.obj(function (file, enc, callback) {
		callback();
	});

	return stream;
};
