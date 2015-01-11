'use strict';
var arrayUniq = require('array-uniq');
var urlRegex = require('url-regex');
var normalizeUrl = require('normalize-url');

module.exports = function (str) {
	var urls = str.match(urlRegex());

	if (!urls) {
		return [];
	}

	return arrayUniq(urls.map(function (url) {
		return normalizeUrl(url.trim().replace(/\.*$/, ''));
	}));
};
