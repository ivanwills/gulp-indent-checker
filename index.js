/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	indent      = require('indent-checker'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-indent-checker';

module.exports = function (options) {
	var stream = through.obj(function (file, enc, callback) {
		console.log(file.path);
		try {
			indent.assertIndent(file.contents + '', options);
		} catch (e) {
			console.log('here');
			file.frror = e;
			console.log(file.path, e);
		}
		try {
			console.log(enc);
			console.log(' ');
		callback(file);
		} catch (e) { console.error(e); }
		console.info('???');
	});

	return stream;
};

module.exports.simpleReporter = function (options) {
	var stream = through.obj(function (file, enc, callback) {
		console.log('simple');
		if (file.frror) {
			console.warn(file.path + ': ' + file.frror);
		}
		callback(file);
	});
	return stream;
};

module.exports.errorReporter = function (options) {
	var errors = 0;
	var stream = through.obj(function (file, enc, callback) {
		if (file.frror) {
			errors++;
		}
		callback(file);
	})
	.on('end', function () {
		if (errors) {
			var msg = errors > 1 ? 'There were ' + errors + ' files with errors!' :
				'There was one file with an error!';
			throw new PluginError(PLUGIN_NAME, msg);
		}
	});
	return stream;
};
