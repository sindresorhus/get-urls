'use strict';
var assert = require('assert');
var fs = require('fs');
var getUrls = require('./');

it('should get unique cleaned-up urls from a string', function () {
	assert.deepEqual(
		getUrls(fs.readFileSync('fixture.txt', 'utf8')),
		[
			'http://google.com',
			'http://www.todomvc.com',
			'http://yeoman.io',
			'http://twitter.com/sindresorhus',
			'https://tastejs.com',
			'http://www.google.com',
			'http://github.com'
		]
	);
});
