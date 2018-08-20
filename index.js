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

	if (typeof options.exclude !== 'undefined' && !Array.isArray(options.exclude)) {
		throw new TypeError('`exclude` must be an array');
	}

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

	for (const excludedItem of options.exclude || []) {
		for (const item of ret) {
			const regex = new RegExp(excludedItem);
			if (regex.test(item)) {
				ret.delete(item);
				break;
			}
		}
	}

	return ret;
};
