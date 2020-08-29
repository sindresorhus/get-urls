import fs from 'fs';
import test from 'ava';
import getUrls from '.';

test('get unique cleaned-up urls from a string', t => {
	t.deepEqual(
		getUrls(fs.readFileSync('fixture.txt', 'utf8')),
		new Set([
			'http://google.com',
			'http://todomvc.com',
			'http://yeoman.io',
			'http://twitter.com/sindresorhus',
			'https://tastejs.com',
			'http://example.com',
			'http://github.com'
		])
	);
});

test('do not get nested urls from query strings', t => {
	const text = 'You can read http://www.awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK for more info';

	t.deepEqual(
		getUrls(text),
		new Set([
			'http://awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK'
		])
	);
});

test('get nested urls from query strings', t => {
	const text = 'You can read http://www.awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK for more info';

	t.deepEqual(
		getUrls(text, {extractFromQueryString: true}),
		new Set([
			'http://awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK',
			'https://uk.hotels.com/hotel/details.html?hotelId=287452&locale=en_GB&pos=HCOM_UK&q-localised-check-in=15%2F12%2F2017&q-localised-check-out=19%2F12%2F2017&q-room-0-adults=2&q-room-0-children=0&tab=description'
		])
	);
});

test('don\'t strip hash when stripHash is set to false', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';

	t.deepEqual(
		getUrls(text, {stripHash: false}),
		new Set(['http://foobar.com/document.html#about'])
	);
});

test('strip hash when stripHash is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.deepEqual(getUrls(text, {stripHash: true}), new Set(['http://foobar.com/document.html']));
});

test('don\'t strip hash by default if stripHash is not in options', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.deepEqual(getUrls(text), new Set(['http://foobar.com/document.html#about']));
});

test('don\'t strip www when stripWWW is set to false', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(getUrls(text, {stripWWW: false}), new Set(['http://www.foobar.com/document.html']));
});

test('strip www when stripWWW is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(getUrls(text, {stripWWW: true}), new Set(['http://foobar.com/document.html']));
});

test('strip www by default if stripWWW is not in options', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(getUrls(text), new Set(['http://foobar.com/document.html']));
});

test('finds urls beginning with `www`', t => {
	const text = 'You can read www.foobar.com/document.html for more info';
	t.deepEqual(getUrls(text), new Set(['http://foobar.com/document.html']));
});

test('exclude matching urls', t => {
	const text = `${fs.readFileSync('fixture.txt', 'utf8')} http://w3.org/2000/svg, http://foobar.com/document.html, https://www.w3schools.com/`;

	t.deepEqual(
		getUrls(text, {exclude: ['http://w3.org/2000/svg', 'foobar.com', 'w3schools']}),
		new Set([
			'http://google.com',
			'http://todomvc.com',
			'http://yeoman.io',
			'http://twitter.com/sindresorhus',
			'https://tastejs.com',
			'http://example.com',
			'http://github.com'
		])
	);
});

test('throw TypeError for non-array `exclude` option', t => {
	t.throws(() => {
		getUrls('http://w3.org/2000/svg', {exclude: ''});
	}, 'The `exclude` option must be an array');
});

test('get urls without scheme', t => {
	const text = 'Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit. www.github.com';

	t.deepEqual(
		getUrls(text, {
			extractFromQueryString: true
		}),
		new Set([
			'http://sindresorhus.com',
			'http://yeoman.io',
			'http://github.com'
		])
	);
});

test('get schemeless url from query string', t => {
	const text = 'You can read http://www.awin1.com/cread.php?a=b&p=%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK for more info';

	t.deepEqual(
		getUrls(text, {
			extractFromQueryString: true
		}),
		new Set([
			'http://awin1.com/cread.php?a=b&p=%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK',
			'http://uk.hotels.com/hotel/details.html?hotelId=287452&locale=en_GB&pos=HCOM_UK&q-localised-check-in=15%2F12%2F2017&q-localised-check-out=19%2F12%2F2017&q-room-0-adults=2&q-room-0-children=0&tab=description'
		])
	);
});

test('requireSchemeOrWww turned off', t => {
	const text = 'Here is a URL: sindresorhus.com here is another: unicorn.education';

	t.deepEqual(
		getUrls(text, {
			requireSchemeOrWww: false
		}),
		new Set([
			'http://sindresorhus.com',
			'http://unicorn.education'
		])
	);
});

test('supports upper case URL', t => {
	const url = 'WWW.POS.COM';

	t.notThrows(() => {
		getUrls(url, {extractFromQueryString: true});
	});
});

test('filter all items from options.exclude', t => {
	const text = `
		http://domain.com/pic/uploadimg/2019-3/PS/818201903010604.jpg
		http://domain.com/81820190301/818201903010604/index.m3u8
		http://domain.com/pic/uploadimg/2019-3/PS/818201903010606.jpg
		http://domain.com/81820190301/818201903010606/index.m3u8
		http://domain.com/pic/uploadimg/2019-3/PS/818201903010615.jpg
	`;

	const exclude = ['.*jpg'];

	t.deepEqual(
		getUrls(text, {exclude}),
		new Set([
			'http://domain.com/81820190301/818201903010604/index.m3u8',
			'http://domain.com/81820190301/818201903010606/index.m3u8'
		])
	);
});

test('throw an error when the text argument is not a string', t => {
	t.throws(() => {
		getUrls();
	}, TypeError);
});

test('handles parens', t => {
	const text = 'foo https://sindresorhus.com/some/example) foo';

	t.deepEqual(
		getUrls(text),
		new Set([
			'https://sindresorhus.com/some/example'
		])
	);
});

test('handles Markdown', t => {
	const text = 'foo [![](https://sindresorhus.com/unicorn.png)](https://sindresorhus.com/?foo=bar) foo';

	t.deepEqual(
		getUrls(text),
		new Set([
			'https://sindresorhus.com/unicorn.png',
			'https://sindresorhus.com/?foo=bar'
		])
	);
});
