'use strict';

var mapStream   = require('map-stream');
var gutil       = require('gulp-util');
var c           = gutil.colors;
var indent      = require('indent-checker');
var through     = require('through2');
var PluginError = require('gulp-util').PluginError;

const PLUGIN_NAME = 'gulp-indent-checker';

var formatOutput = function (msg) {
	var output = {};

	if (msg) {
		output.message = msg;
	}

	output.success = !!msg;

	return output;
};

var indentCheckerPlugin = function (options) {
	options = options || {};

	return mapStream(function (file, cb) {
		var errorMessage = '';
		console.log(file.path);

		try {
			indent.assertIndent(file.contents + '', options);
		} catch (err) {
			errorMessage = JSON.stringify(err);
		}
		file.indent = formatOutput(errorMessage);

		cb(null, file);
	});
};

var defaultReporter = function (file) {
	gutil.log(c.yellow('Error on file ') + c.magenta(file.path));
	gutil.log(c.red(file.indent.message));
};

indentCheckerPlugin.reporter = function (customReporter) {
	var reporter = defaultReporter;

	if (typeof customReporter === 'function') {
		reporter = customReporter;
	}

	return mapStream(function (file, cb) {
		if (file.indent && !file.indent.success) {
			reporter(file);
		}
		return cb(null, file);
	});
};

/**
 * Fail when an indent error is found in indent results.
 */
indentCheckerPlugin.failOnError = function () {

	return through.obj(function (file, enc, cb) {
		if (file.indent.success === false) {
			var error = new PluginError(
				'gulp-indent', {
				name: 'IndentChecError',
				filename: file.path,
				message: file.indent.message,
			});
		}

		return cb(error, file);
	});
};

/**
 * Fail when the stream ends if any indentChecker error(s) occurred
 */
indentCheckerPlugin.failAfterError = function () {
	var errorCount = 0;

	return through.obj(function (file, enc, cb) {
		errorCount += file.indent.success === false

		cb(null, file);

	}, function (cb) {
		if (errorCount > 0) {
			this.emit('error', new PluginError(
				PLUGIN_NAME, {
				name: 'IndentChecError',
				message: 'Failed with ' + errorCount + (errorCount === 1 ? ' error' : ' errors')
			}));
		}

		cb();
	});
};

module.exports = indentCheckerPlugin;
