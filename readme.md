# get-urls [![Build Status](https://travis-ci.org/sindresorhus/get-urls.svg?branch=master)](https://travis-ci.org/sindresorhus/get-urls)

Very simple, self-contained way to get all urls in a string. For a more reliable solution, consider [find-urls](https://github.com/juliangruber/find-urls) or use [the official URL regexp from Component](https://github.com/component/regexps/blob/master/index.js#L3).

The urls will be [normalized](https://github.com/sindresorhus/normalize-url) and uniquified.


## Install

```
$ npm install --save get-urls
```


## Usage

```js
var text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> ['http://sindresorhus.com', 'http://yeoman.io']
```


## API

### getUrls(text, [options]);

### text

*Required*  
Type: `string`

### options

Type: `object`

See the `normalize-url` [options](https://github.com/sindresorhus/normalize-url#options).


## CLI

```
$ npm install --global get-urls
```

```
$ get-urls --help

  Usage
    get-urls <file>
    cat <file> | get-urls
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
