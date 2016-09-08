/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	indent      = require('indent-checker'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-indent-checker';

module.exports = function (options) {
	var stream = through.obj(function (file, enc, callback) {
		try {
			indent.assertIndent(file.contents + '', options);
		} catch (e) {
			console.log(e);
			throw new PluginError(PLUGIN_NAME, file.path + ': ' + e);
		}
		callback();
	});

	return stream;
};
