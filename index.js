'use strict';
const arrayUniq = require('array-uniq');
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');

module.exports = (str, opts) => {
	const urls = str.match(urlRegex());

	if (!urls) {
		return [];
	}

	return arrayUniq(urls.map(url => normalizeUrl(url.trim().replace(/\.+$/, ''), opts)));
};
