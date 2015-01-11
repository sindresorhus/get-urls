'use strict';
var assert = require('assert');
var fs = require('fs');
var getUrls = require('./');

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
