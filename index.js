'use strict';
var arrayUniq    = require('array-uniq'),
    urlRegex     = require('url-regex'),
    normalizeUrl = require('normalize-url'),
    objectAssign = require('object-assign');

module.exports = function (str, opts) {
  opts = objectAssign({
    stripWWW: true,
    stripFragment: true,
  }, opts);

	var urls = str.match(urlRegex());

	if (!urls) {
		return [];
	}

	return arrayUniq(urls.map(function (url) {
		return normalizeUrl(url.trim().replace(/\.*$/, ''), opts);
	}));
};
