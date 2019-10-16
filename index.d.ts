import {Options as NormalizeUrlOptions} from 'normalize-url';

declare namespace getUrls {
	interface Options extends NormalizeUrlOptions {
		/**
		Extract URLs that appear as query parameters in the found URLs.

		@default false
		*/
		readonly extractFromQueryString?: boolean;

		/**
		Exclude URLs that match URLs in the given array.

		@default []
		*/
		readonly exclude?: string[];

		/**
		 Require a leading `www` or scheme for a string to be considered
		 a URL, as per the strict flag in url-regex. Does not affect URLs
		 in query parameters if using the `extractFromQueryString` option. When
		 `false`, matches against a list of valid TLDs, so it will match URLs like
		 `unicorn.education`

		 @default: true
		 */
		readonly requireSchemeOrWww?: boolean;
	}
}

/**
Get all URLs in a string.

The URLs will be [normalized](https://github.com/sindresorhus/normalize-url).

@returns A `Set` of URLs.

@example
```
import getUrls = require('get-urls');

const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> Set {'http://sindresorhus.com', 'http://yeoman.io'}
```
*/
declare function getUrls(text: string, options?: getUrls.Options): Set<string>;

export = getUrls;
