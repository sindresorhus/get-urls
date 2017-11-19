'use strict';
const urlRegex = require('url-regex')();
const normalizeUrl = require('normalize-url');
const queryString = require('query-string');

module.exports = (str, opts) => {
	const urls = str.match(urlRegex) || [];
	const ret = new Set();
	urls.forEach(url => {
		_add(url);
		_extractQueryParams(url);
	});
	return ret;

	function _add(url) {
		ret.add(normalizeUrl(url.trim().replace(/\.+$/, ''), opts));
	}

	function _extractQueryParams(url) {
		const qs = queryString.parse(queryString.extract(url));
		for (const key in qs) {
			if (Object.prototype.hasOwnProperty.call(qs, key) && qs[key].match(urlRegex)) {
				_add(qs[key]);
			}
		}
	}
};

