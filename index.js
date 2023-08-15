import urlRegex from 'url-regex-safe';
import normalizeUrl from 'normalize-url';
import {isMatch, matches} from 'super-regex';

const getUrlsFromQueryParameters = url => {
	const returnValue = new Set();
	const {searchParams} = (new URL(url.replace(/^(?:\/\/|(?:www\.))/i, 'http://$2')));

	for (const [, value] of searchParams) {
		if (isMatch(urlRegex({exact: true}), value, {timeout: 500})) {
			returnValue.add(value);
		}
	}

	return returnValue;
};

export default function getUrls(text, options = {}) {
	if (typeof text !== 'string') {
		throw new TypeError(`The \`text\` argument should be a string, got ${typeof text}`);
	}

	if (options.exclude !== undefined && !Array.isArray(options.exclude)) {
		throw new TypeError('The `exclude` option must be an array');
	}

	const returnValue = new Set();

	const add = url => {
		try {
			returnValue.add(normalizeUrl(url.trim().replace(/\.+$/, ''), options));
		} catch {}
	};

	const results = matches(
		urlRegex(options.requireSchemeOrWww === undefined ? undefined : {
			re2: false,
			strict: options.requireSchemeOrWww,
			parens: true,
		}),
		text,
		{
			matchTimeout: 500,
		},
	);

	for (const {match: url} of results) {
		add(url);

		if (options.extractFromQueryString) {
			const queryStringUrls = getUrlsFromQueryParameters(url);
			for (const queryStringUrl of queryStringUrls) {
				add(queryStringUrl);
			}
		}
	}

	for (const excludedItem of options.exclude ?? []) {
		const regex = new RegExp(excludedItem);

		for (const item of returnValue) {
			if (isMatch(regex, item, {timeout: 500})) {
				returnValue.delete(item);
			}
		}
	}

	return returnValue;
}
