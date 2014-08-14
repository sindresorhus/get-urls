'use strict';
var arrayUniq = require('array-uniq');

module.exports = function (str) {
	var reUrl = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
	var urls = str.match(reUrl);

	if (!urls) {
		return [];
	}

	return arrayUniq(urls.map(function (url) {
		// cleanup and normalize the url
		return url.trim().replace(/\.*$/, '').replace(/^(?!https?:\/\/)/, 'http://');
	}));
};
