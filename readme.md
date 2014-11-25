# get-urls [![Build Status](https://travis-ci.org/sindresorhus/get-urls.svg?branch=master)](https://travis-ci.org/sindresorhus/get-urls)

> Get all urls in a string

The urls will be normalized and uniquified.


## Install

```sh
$ npm install --save get-urls
```


## Usage

```js
var text = 'Lorem ipsum dolor sit amet, sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> ['http://sindresorhus.com', 'http://yeoman.io']
```


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
