# get-urls [![Build Status](https://travis-ci.org/sindresorhus/get-urls.png?branch=master)](http://travis-ci.org/sindresorhus/get-urls)

> Get all urls in a string

The urls will be normalized and uniquified.


## Install

Download [manually](https://github.com/sindresorhus/get-urls/releases) or with a package-manager.

#### [npm](https://npmjs.org/package/get-urls)

```
npm install --save get-urls
```

#### [Bower](http://bower.io)

```
bower install --save get-urls
```

#### [Component](https://github.com/component/component)

```
component install sindresorhus/get-urls
```


## Example

```js
var text = 'Lorem ipsum dolor sit amet, sindresorhus.com consectetuer adipiscing http://yeoman.io elit.';

getUrls(text);
//=> ['http://sindresorhus.com', 'http://yeoman.io']
```


## CLI

You can also use it as a CLI app by installing it globally:

```
npm install --global get-urls
```

#### Usage

```
$ get-urls -h

get-urls <input-file>
or
cat <input-file> | get-urls
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
