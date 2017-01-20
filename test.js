import fs from 'fs';
import test from 'ava';
import m from './';

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
