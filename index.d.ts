declare module 'get-urls' {
	import * as NormalizeURL from 'normalize-url';

	export = get_urls;

	interface GetURLsOptions extends NormalizeURL.Options {
		/**
		 * Extract URLs that appear as query parameters in the found URLs
		 *
		 * @default false
		 */
		extractFromQueryString?: boolean;

		/**
		 * Exclude URLs that match URLs in the given array.
		 */
		exclude?: string[];
	}

	function get_urls(text: string, options?: GetURLsOptions): Set<string>;
}
