'use strict';
const URL = require('url');
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');
const unescape = require('unescape');

module.exports = (str, opts) => {
	opts = opts || {};
	const ret = new Set();
	const add = url => ret.add(normalizeUrl(unescape(url.trim().replace(/\.+$/, '')), opts));
	const urls = str.match(urlRegex()) || [];
	for (const url of urls) {
		add(url);
		if (opts.getQueryParams) {
			const qsUrls = extractQueryParams(url);
			for (const qsUrl of qsUrls) {
				add(qsUrl);
			}
		}
	}
	return ret;
};

function extractQueryParams(url) {
	const ret = new Set();
	const qs = URL.parse(url, true).query;
	for (const key in qs) {
		if (Object.prototype.hasOwnProperty.call(qs, key) && urlRegex().test(qs[key])) {
			ret.add(qs[key]);
		}
	}
	return ret;
}
