/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	indent      = require('indent-checker'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-indent-checker';

module.exports = function (options) {
	var errors = 0;
	var stream = through.obj(function (file, enc, callback) {
		try {
			indent.assertIndent(file.contents + '', options);
		} catch (e) {
			if (options.warn || options.throwAtEnd) {
				console.warn(file.path + ': ' + e);
				errors++;
			}
			else {
				console.log(e);
				throw new PluginError(PLUGIN_NAME, file.path + ': ' + e);
			}
		}
		callback();
	})
	.on('end', function () {
		if (options.throwAtEnd && errors) {
			var msg = errors > 1 ? 'There were ' + errors + ' files with errors!' :
				'There was one file with an error!';
			throw new PluginError(PLUGIN_NAME, msg);
		}
	});

	return stream;
};
