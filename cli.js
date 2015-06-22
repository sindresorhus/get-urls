#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var stdin = require('get-stdin');
var getUrls = require('./');

var cli = meow({
	help: [
		'Usage',
		'  get-urls <file>',
		'  cat <file> | get-urls'
	]
});

var input = cli.input[0];

function init(data) {
	console.log(getUrls(data).join('\n'));
}

if (!input && process.stdin.isTTY) {
	console.error('Input file required');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	stdin(init);
}
