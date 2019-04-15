import {expectType} from 'tsd';
import getUrls = require('.');

const text =
	'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

expectType<Set<string>>(getUrls(text));
expectType<Set<string>>(getUrls(text, {extractFromQueryString: true}));
expectType<Set<string>>(getUrls(text, {exclude: ['foo']}));
expectType<Set<string>>(getUrls(text, {defaultProtocol: 'ftp'}));
