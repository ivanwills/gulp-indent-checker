[![Build Status](https://travis-ci.org/ivanwills/gulp-indent-checker.svg?branch=master)](https://travis-ci.org/ivanwills/gulp-indent-checker?branch=master)
[![Coverage Status](https://coveralls.io/repos/ivanwills/gulp-indent-checker/badge.svg?branch=master)](https://coveralls.io/r/ivanwills/gulp-indent-checker?branch=master)
[![Dependency Status](https://david-dm.org/ivanwills/gulp-indent-checker.svg)](https://david-dm.org/ivanwills/gulp-indent-checker.svg)
[![Code Quality](https://www.codacy.com/project/badge/23cf2066e4654fdba5e6d50f1f729268)](https://www.codacy.com/app/ivan-wills/gulp-indent-checker)

gulp-indent-checker
==============

Gulp plugin to validate that all files follow indent styling.

Version
=======

This documentation refers to gulp-indent-checker verions 0.1.0

Synopsis
========

```js
var gulp = require('gulp'),
  indents = require('gulp-indent-checker');

gulp.task('check-indentation', function () {
  return gulp.src('src/**')
    .pipe(indents({
      warn: false,
      throwAtEnd: false,
      type: false
    }));
});
```

Description
===========

*gulp-indent-checker* aims to help enforce indentation style in a project.
This is particularly useful for file types that don't have a lint plugin.

Options
=======

There are three options to effect how *gulp-indent-checker* works:

* type - Specifies the type of indentation allowed
  * 'tabs' - allow only tabs for indentation
  * 'spaces' - allow only spaces for indentation
  * not set or false - allow only one type of indentation in a file (errors if indentation is mixed tabs and spaces)
* warn - Warn about files that don't meet indentation style
* throwAtEnd - Only throw an error after all files are processed.
