import { EventRepository } from '../../domain/repositories/event-repository';
import { EventFilters } from '../../domain/models/types';
import { Event } from '../../domain/models/Event';
import { v4 as uuidv4 } from 'uuid';

const fakeEvents: Event[] = [
	new Event(
		uuidv4(),
		'title of the event',
		'description of the event',
		'2022-01-01',
		'reims'
	),
	new Event(
		uuidv4(),
		'title of the event',
		'description of the event',
		'2022-01-01',
		'reims'
	),
];

export class InMemoryEvents implements EventRepository {
	private _events: Event[] = [];

	public findFilteredEvents(_filters: EventFilters): Promise<Event[]> {
		return Promise.resolve(this._events);
	}

	public setEvents(events: Event[]): void {
		this._events = events;
	}

	public populateFakeEvents(): void {
		this._events = fakeEvents;
	}
}
