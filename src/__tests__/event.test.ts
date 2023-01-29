import test from 'ava';
import { Event } from '../domain/models/Event';
import { v4 as uuidv4 } from 'uuid';

test('an event should have a valid uuid', (t) => {
	t.throws(() => {
		new Event(
			'1',
			'title of the event',
			'description of the event',
			'2022-01-01',
			'reims'
		);
	});
});

test('an event should have a valid date', (t) => {
	t.throws(() => {
		new Event(
			uuidv4(),
			'title of the event',
			'description of the event',
			'invalid date',
			'reims'
		);
	});
});

test('an event should not have an empty city', (t) => {
	t.throws(() => {
		new Event(
			uuidv4(),
			'title of the event',
			'description of the event',
			'2022-01-01',
			''
		);
	});
});

test('an event should have a title at least 5 characters long', (t) => {
	t.throws(() => {
		new Event(
			uuidv4(),
			'test',
			'description of the event',
			'2022-01-01',
			'reims'
		);
	});
});

test('an event should have a description at least 10 characters long', (t) => {
	t.throws(() => {
		new Event(uuidv4(), 'title of the event', 'desc', '2022-01-01', 'reims');
	});
});

test('should create a valid event', (t) => {
	const event = new Event(
		uuidv4(),
		'title of the event',
		'description of the event',
		'2022-01-01',
		'reims'
	);
	t.is(event.id().length, 36);
	t.is(event.title(), 'title of the event');
	t.is(event.description(), 'description of the event');
	t.is(event.date(), '2022-01-01');
	t.is(event.city(), 'reims');
});
