#!/usr/bin/env node
'use strict';
var fs = require('fs');
var stdin = require('get-stdin');
var pkg = require('./package.json');
var getUrls = require('./');
var argv = process.argv.slice(2);
var input = argv[0];

function help() {
	console.log([
		'',
		'  ' + pkg.description,
		'',
		'  Usage',
		'    get-urls <file>',
		'    cat <file> | get-urls'
	].join('\n'));
}

function init(data) {
	console.log(getUrls(data).join('\n'));
}

if (argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

if (process.stdin.isTTY) {
	if (!input) {
		help();
		return;
	}

	init(fs.readFileSync(input, 'utf8'));
} else {
	stdin(init);
}
