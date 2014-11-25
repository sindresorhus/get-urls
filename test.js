'use strict';
var assert = require('assert');
var fs = require('fs');
var spawn = require('child_process').spawn;
var getUrls = require('./');

var expected = [
	'http://google.com',
	'http://www.todomvc.com',
	'http://yeoman.io',
	'http://twitter.com/sindresorhus',
	'https://tastejs.com',
	'http://www.google.com',
	'http://github.com'
];

it('should get unique cleaned-up urls from a string', function () {
	assert.deepEqual(getUrls(fs.readFileSync('fixture.txt', 'utf8')), expected);
});

it('should get unique cleaned-up urls from a string using the CLI', function (cb) {
	var cp = spawn(__dirname + '/cli.js');
	var read = fs.createReadStream(__dirname + '/fixture.txt');

	cp.stdout.setEncoding('utf8');
	cp.stdout.on('data', function (data) {
		data = data.trim().split('\n');
		assert.deepEqual(data, expected);
		cb();
	});

	read.pipe(cp.stdin);
});
