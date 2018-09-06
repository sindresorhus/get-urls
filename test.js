import fs from 'fs';
import test from 'ava';
import m from '.';

test('get unique cleaned-up urls from a string', t => {
	t.deepEqual(m(fs.readFileSync('fixture.txt', 'utf8')), new Set([
		'http://google.com',
		'http://todomvc.com',
		'http://yeoman.io',
		'http://twitter.com/sindresorhus',
		'https://tastejs.com',
		'http://example.com',
		'http://github.com'
	]));
});

test(`do not get nested urls from query strings`, t => {
	const text = 'You can read http://www.awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK for more info';
	t.deepEqual(
		m(text),
		new Set([
			'http://awin1.com/cread.php?a=b&p=https://uk.hotels.com/hotel/details.html?tab=description&hotelId=287452&q-localised-check-in=15/12/2017&q-localised-check-out=19/12/2017&q-room-0-adults=2&q-room-0-children=0&locale=en_GB&pos=HCOM_UK'
		])
	);
});

test(`get nested urls from query strings`, t => {
	const text = 'You can read http://www.awin1.com/cread.php?a=b&p=https%3A%2F%2Fuk.hotels.com%2Fhotel%2Fdetails.html%3Ftab%3Ddescription%26hotelId%3D287452%26q-localised-check-in%3D15%2F12%2F2017%26q-localised-check-out%3D19%2F12%2F2017%26q-room-0-adults%3D2%26q-room-0-children%3D0%26locale%3Den_GB%26pos%3DHCOM_UK for more info';
	t.deepEqual(
		m(text, {extractFromQueryString: true}),
		new Set([
			'http://awin1.com/cread.php?a=b&p=https://uk.hotels.com/hotel/details.html?tab=description&hotelId=287452&q-localised-check-in=15/12/2017&q-localised-check-out=19/12/2017&q-room-0-adults=2&q-room-0-children=0&locale=en_GB&pos=HCOM_UK',
			'https://uk.hotels.com/hotel/details.html?hotelId=287452&locale=en_GB&pos=HCOM_UK&q-localised-check-in=15/12/2017&q-localised-check-out=19/12/2017&q-room-0-adults=2&q-room-0-children=0&tab=description'
		])
	);
});

test(`don't strip fragments when skipFragments is set to false`, t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.deepEqual(
		m(text, {stripFragment: false}),
		new Set(['http://foobar.com/document.html#about'])
	);
});

test('strip fragments when skipFragments is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.deepEqual(m(text, {stripFragment: true}), new Set(['http://foobar.com/document.html']));
});

test('strip fragments by default if skipFragments is not in opt', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.deepEqual(m(text), new Set(['http://foobar.com/document.html']));
});

test(`don't strip www when stripWWW is set to false`, t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(m(text, {stripWWW: false}), new Set(['http://www.foobar.com/document.html']));
});

test('strip www when stripWWW is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(m(text, {stripWWW: true}), new Set(['http://foobar.com/document.html']));
});

test('strip www by default if stripWWW is not in opt', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.deepEqual(m(text), new Set(['http://foobar.com/document.html']));
});

test('finds urls beginning with `www`', t => {
	const text = 'You can read www.foobar.com/document.html for more info';
	t.deepEqual(m(text), new Set(['http://foobar.com/document.html']));
});

test('exclude matching urls', t => {
	const text = `${fs.readFileSync('fixture.txt', 'utf8')} http://w3.org/2000/svg, http://foobar.com/document.html, https://www.w3schools.com/`;
	t.deepEqual(m(text, {exclude: ['http://w3.org/2000/svg', 'foobar.com', 'w3schools']}), new Set([
		'http://google.com',
		'http://todomvc.com',
		'http://yeoman.io',
		'http://twitter.com/sindresorhus',
		'https://tastejs.com',
		'http://example.com',
		'http://github.com'
	]));
});

test('throw TypeError for non-array `exclude` option', t => {
	const error = t.throws(() => {
		m('http://w3.org/2000/svg', {exclude: ''});
	}, TypeError);
	t.is(error.message, '`exclude` must be an array');
});
