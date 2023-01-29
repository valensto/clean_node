import { EventService } from './services/event-service';
import { Event } from './models/Event';
import { EventRepository } from './repositories/event-repository';
import { EventFilters } from './models/types';

export class Store implements EventService {
	constructor(private _repository: EventRepository) {}

	listEvents(filters: EventFilters): Promise<Event[]> {
		return this._repository.findFilteredEvents(filters);
	}
}
