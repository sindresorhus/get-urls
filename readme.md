# get-urls [![Build Status](https://travis-ci.org/sindresorhus/get-urls.svg?branch=master)](https://travis-ci.org/sindresorhus/get-urls)

> Get all URLs in a string

The URLs will be [normalized](https://github.com/sindresorhus/normalize-url).


## Install

```
$ npm install --save get-urls
```


## Usage

```js
const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> Set {'http://sindresorhus.com', 'http://yeoman.io'}
```


## API

### getUrls(text, [options])

Returns a `Set` of URLs.

### text

Type: `string`

### options

Type: `Object`

All the `normalize-url` [options](https://github.com/sindresorhus/normalize-url#options) in addition to:

- getQueryParams - extract urls that appear as query parameters in the found urls.


## Related

- [get-urls-cli](https://github.com/sindresorhus/get-urls-cli) - CLI for this module
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text
- [url-regex](https://github.com/kevva/url-regex) - Regular expression for matching URLs


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
