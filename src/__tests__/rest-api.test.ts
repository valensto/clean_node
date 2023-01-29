import test from 'ava';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { startServer as startExpressServer } from '../adapters/rest/express';
import { Event } from '../domain/models/Event';
import { api } from '../domain/services/event-service';
import { InMemoryEvents } from '../infrastructure/databases/InMemoryEvents';

test('should fetch all event', async (t) => {
	const Repository = new InMemoryEvents();

	const expectedEventList: Event[] = [
		new Event(uuidv4(), 'title event 1', 'description event 1', '2022-01-01', 'reims'),
	];
	Repository.setEvents(expectedEventList);

	const port = 3001;
	await startExpressServer(port, api(Repository));

	const url = `http://localhost:${port}`;

	const res = await fetch(`${url}/events`);
	const events = await res.text();

	t.is(events, JSON.stringify(expectedEventList));
});
