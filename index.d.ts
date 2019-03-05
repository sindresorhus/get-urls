import * as NormalizeURL from 'normalize-url';

export interface GetURLsOptions extends NormalizeURL.Options {
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

export default function getUrls(text: string, options?: GetURLsOptions): Set<string>;
