'use strict';
const {URL} = require('url');
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');

function getUrlsFromQueryParams(url) {
	const ret = new Set();
	const {searchParams} = (new URL(url));

	for (const [, value] of searchParams) {
		if (urlRegex({exact: true}).test(value)) {
			ret.add(value);
		}
	}

	return ret;
}

module.exports = (text, options = {}) => {
	if (typeof options.exclude !== 'undefined' && !Array.isArray(options.exclude)) {
		throw new TypeError('The `exclude` option must be an array');
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
