'use strict';
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');
const queryString = require('query-string');
const unescape = require('unescape');

module.exports = (str, opts) => {
	opts = opts || {};
	const ret = new Set();

	function _extractQueryParams(url) {
		const qs = queryString.parse(queryString.extract(url));
		for (const key in qs) {
			if (Object.prototype.hasOwnProperty.call(qs, key) && qs[key].match(urlRegex())) {
				_add(qs[key]);
			}
		}
	}

	function _add(url) {
		ret.add(normalizeUrl(unescape(url.trim().replace(/\.+$/, '')), opts));
	}

	const urls = str.match(urlRegex()) || [];
	urls.forEach(url => {
		_add(url);
		if (opts.getQueryParams) {
			_extractQueryParams(url);
		}
	});
	return ret;
};

