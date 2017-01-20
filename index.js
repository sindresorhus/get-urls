'use strict';
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');

module.exports = (str, opts) => {
	const urls = str.match(urlRegex());
	const ret = urls ? urls.map(url => normalizeUrl(url.trim().replace(/\.+$/, ''), opts)) : [];
	return new Set(ret);
};
