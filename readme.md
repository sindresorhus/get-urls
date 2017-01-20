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

See the `normalize-url` [options](https://github.com/sindresorhus/normalize-url#options).


## Related

- [get-urls-cli](https://github.com/sindresorhus/get-urls-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
