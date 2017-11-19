'use strict';
const urlRegex = require('url-regex')();
const normalizeUrl = require('normalize-url');
const queryString = require('query-string');

module.exports = (str, opts) => {
	const urls = str.match(urlRegex) || [];
	const ret = new Set();
	urls.forEach(url => {
		ret.add(_normalize(url, opts));
		_extractQueryParams(url, ret, opts);
	});
	return ret;
};

function _normalize(url, opts) {
	return normalizeUrl(url.trim().replace(/\.+$/, ''), opts);
}

function _extractQueryParams(url, ret, opts) {
	const qs = queryString.parse(queryString.extract(url));
	for (const key in qs) {
		if (Object.prototype.hasOwnProperty.call(qs, key)) {
			const qsParam = qs[key];
			if (qsParam.match(urlRegex)) {
				ret.add(_normalize(qsParam, opts));
			}
		}
	}
}
