'use strict';
var assert = require('assert');
var fs = require('fs');
var getUrls = require('./');

describe('should find urls in fixture file', function () {
	var expected = [
		'http://google.com',
		'http://todomvc.com',
		'http://yeoman.io',
		'http://twitter.com/sindresorhus',
		'https://tastejs.com',
		'http://github.com'
	];

	it('should get unique cleaned-up urls from a string', function () {
		assert.deepEqual(getUrls(fs.readFileSync('fixture.txt', 'utf8')), expected);
	});
});

describe('stripFragment option', function () {
	it('should not strip fragments when skipFragments is set to false', function () {
		var text = 'You can read http://www.foobar.com/document.html#about for more info';
		var expected = ['http://foobar.com/document.html#about'];
		var actual = getUrls(text, {stripFragment: false});
		assert.deepEqual(actual, expected);
	});

	it('should strip fragments when skipFragments is set to true', function () {
		var text = 'You can read http://www.foobar.com/document.html#about for more info';
		var expected = ['http://foobar.com/document.html'];
		var actual = getUrls(text, {stripFragment: true});
		assert.deepEqual(actual, expected);
	});

	it('should strip fragments by default if skipFragments is not in opt', function () {
		var text = 'You can read http://www.foobar.com/document.html#about for more info';
		var expected = ['http://foobar.com/document.html'];
		var actual = getUrls(text);
		assert.deepEqual(actual, expected);
	});
});

describe('stripWWW option', function () {
	it('should not strip www when stripWWW is set to false', function () {
		var text = 'You can read http://www.foobar.com/document.html for more info';
		var expected = ['http://www.foobar.com/document.html'];
		var actual = getUrls(text, {stripWWW: false});
		assert.deepEqual(actual, expected);
	});

	it('should strip www when stripWWW is set to true', function () {
		var text = 'You can read http://www.foobar.com/document.html for more info';
		var expected = ['http://foobar.com/document.html'];
		var actual = getUrls(text, {stripWWW: true});
		assert.deepEqual(actual, expected);
	});

	it('should strip www by default if stripWWW is not in opt', function () {
		var text = 'You can read http://www.foobar.com/document.html for more info';
		var expected = ['http://foobar.com/document.html'];
		var actual = getUrls(text);
		assert.deepEqual(actual, expected);
	});
});
