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
	].join('\n')
});

function init(data) {
	console.log(getUrls(data).join('\n'));
}

if (process.stdin.isTTY) {
	if (!cli.input.length) {
		console.error('Input file required');
		process.exit(1);
	}

	init(fs.readFileSync(cli.input[0], 'utf8'));
} else {
	stdin(init);
}
