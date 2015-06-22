# get-urls [![Build Status](https://travis-ci.org/sindresorhus/get-urls.svg?branch=master)](https://travis-ci.org/sindresorhus/get-urls)

> Get all urls in a string

The urls will be normalized and uniquified.


## Install

```sh
$ npm install --save get-urls
```


## Usage
### getUrls(text, [options]);

```js
var text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> ['http://sindresorhus.com', 'http://yeoman.io']
```

### text
*Required*

Type: `string`

### options

Type: `object`

This object is passed to [normalize-url](https://github.com/sindresorhus/normalize-url). The properties and their functionality is described in the normalize-url [readme](https://github.com/sindresorhus/normalize-url/blob/master/readme.md).

## CLI

```sh
$ npm install --global get-urls
```

```sh
$ get-urls --help

  Usage
    get-urls <file>
    cat <file> | get-urls
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
