import * as NormalizeURL from 'normalize-url';

interface Options extends NormalizeURL.Options {
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

/**
 * Get all URLs in a string
 *
 * @remarks
 * The URLs will be normalized using normalize-url.
 *
 * @param text - The text to match URLs in
 * @param options - The options to use when normalizing and extracting URLs
 * @returns A Set containing all URLs found in the string
 */
declare function getUrls(text: string, options?: Options): Set<string>;
export default getUrls;
