import fs from 'fs';
import test from 'ava';
import fn from './';

test('get unique cleaned-up urls from a string', t => {
	t.same(fn(fs.readFileSync('fixture.txt', 'utf8')), [
		'http://google.com',
		'http://todomvc.com',
		'http://yeoman.io',
		'http://twitter.com/sindresorhus',
		'https://tastejs.com',
		'http://github.com'
	]);
});

test(`don't strip fragments when skipFragments is set to false`, t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.same(fn(text, {stripFragment: false}), ['http://foobar.com/document.html#about']);
});

test('strip fragments when skipFragments is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.same(fn(text, {stripFragment: true}), ['http://foobar.com/document.html']);
});

test('strip fragments by default if skipFragments is not in opt', t => {
	const text = 'You can read http://www.foobar.com/document.html#about for more info';
	t.same(fn(text), ['http://foobar.com/document.html']);
});

test(`don't strip www when stripWWW is set to false`, t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.same(fn(text, {stripWWW: false}), ['http://www.foobar.com/document.html']);
});

test('strip www when stripWWW is set to true', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.same(fn(text, {stripWWW: true}), ['http://foobar.com/document.html']);
});

test('strip www by default if stripWWW is not in opt', t => {
	const text = 'You can read http://www.foobar.com/document.html for more info';
	t.same(fn(text), ['http://foobar.com/document.html']);
});
