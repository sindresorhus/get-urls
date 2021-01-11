# get-urls

> Get all URLs in a string

The URLs will be [normalized](https://github.com/sindresorhus/normalize-url).

*Don't use this for any kind of security-related validation.*

## Install

```
$ npm install get-urls
```

## Usage

```js
const getUrls = require('get-urls');

const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> Set {'http://sindresorhus.com', 'http://yeoman.io'}
```

## API

### getUrls(text, options?)

Returns a `Set` of URLs.

### text

Type: `string`

### options

Type: `object`

All the `normalize-url` [options](https://github.com/sindresorhus/normalize-url#options) in addition to:

#### extractFromQueryString

Type: `boolean`\
Default: `false`

Extract URLs that appear as query parameters in the found URLs.

#### exclude

Type: `string[]`\
Default: `[]`

Exclude URLs that match URLs in the given array.

#### requireSchemeOrWww

Type: `boolean`\
Default: `false`

Require URLs to have a scheme or leading `www.` to be considered an URL. When `false`, matches against a list of valid TLDs, so it will match URLs like `unicorn.education`.

Does not affect URLs in query parameters if using the `extractFromQueryString` option.

## Related

- [get-urls-cli](https://github.com/sindresorhus/get-urls-cli) - CLI for this module
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text
- [url-regex](https://github.com/kevva/url-regex) - Regular expression for matching URLs
