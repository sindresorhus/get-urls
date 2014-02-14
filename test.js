'use strict';
var assert = require('assert');
var fs = require('fs');
var getUrls = require('./get-urls');

it('should get unique cleaned-up urls from a string', function () {
	assert.deepEqual(
		getUrls(fs.readFileSync('fixture.txt', 'utf8')),
		[
			'http://google.com',
			'http://yeoman.io',
			'http://twitter.com',
			'https://tastejs.com',
			'http://www.google.com'
		]
	);
});
