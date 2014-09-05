'use strict';
var arrayUniq = require('array-uniq');
var urlRegex = require('url-regex');

module.exports = function (str) {
	var urls = str.match(urlRegex());

	if (!urls) {
		return [];
	}

	return arrayUniq(urls.map(function (url) {
		// cleanup and normalize the url
		return url.trim().replace(/\.*$/, '').replace(/^(?!https?:\/\/)/, 'http://');
	}));
};
