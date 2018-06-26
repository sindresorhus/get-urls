'use strict';
const URL = require('url');
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');

function getUrlsFromQueryParams(url) {
	const ret = new Set();

	// TODO: Use `(new URL(url)).searchParams` when targeting Node.js 8
	const qs = URL.parse(url, true).query;

	for (const key of Object.keys(qs)) {
		const value = qs[key];
		if (urlRegex({exact: true}).test(value)) {
			ret.add(value);
		}
	}

	return ret;
}

module.exports = (text, options) => {
	options = options || {};

	const ret = new Set();

	const add = url => {
		ret.add(normalizeUrl(url.trim().replace(/\.+$/, ''), options));
	};

	const urls = text.match(urlRegex()) || [];
	for (const url of urls) {
		add(url);

		if (options.extractFromQueryString) {
			for (const qsUrl of getUrlsFromQueryParams(url)) {
				add(qsUrl);
			}
		}
	}

	if (options.exclude && Array.isArray(options.exclude)) {
		for (let i = 0; i < options.exclude.length; i++) {
			for (const item of ret) {
				if (item.search(options.exclude[i]) > -1) {
					ret.delete(item);
					break;
				}
			}
		}
	}
	return ret;
};
