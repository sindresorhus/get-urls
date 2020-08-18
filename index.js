'use strict';
const urlRegex = require('url-regex-safe');
const normalizeUrl = require('normalize-url');

const getUrlsFromQueryParams = url => {
	const ret = new Set();
	const {searchParams} = (new URL(url.replace(/^(?<slashes>\/\/|(?<identifier>www\.))/i, 'http://$2')));

	for (const [, value] of searchParams) {
		if (urlRegex({exact: true}).test(value)) {
			ret.add(value);
		}
	}

	return ret;
};

module.exports = (text, options = {}) => {
	if (typeof text !== 'string') {
		throw new TypeError(`The \`text\` argument should be a string, got ${typeof text}`);
	}

	if (typeof options.exclude !== 'undefined' && !Array.isArray(options.exclude)) {
		throw new TypeError('The `exclude` option must be an array');
	}

	const ret = new Set();

	const add = url => {
		try {
			ret.add(normalizeUrl(url.trim().replace(/\.+$/, ''), options));
		} catch (_) {}
	};

	const urls = text.match(
		urlRegex(options.requireSchemeOrWww === undefined ? undefined : {
			strict: options.requireSchemeOrWww
		})
	) || [];
	for (const url of urls) {
		add(url);

		if (options.extractFromQueryString) {
			const qsUrls = getUrlsFromQueryParams(url);
			for (const qsUrl of qsUrls) {
				add(qsUrl);
			}
		}
	}

	for (const excludedItem of options.exclude || []) {
		for (const item of ret) {
			const regex = new RegExp(excludedItem);
			if (regex.test(item)) {
				ret.delete(item);
			}
		}
	}

	return ret;
};
