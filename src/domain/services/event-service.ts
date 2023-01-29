import { Event } from '../models/Event';
import { EventFilters } from '../models/types';
import { EventRepository } from '../repositories/event-repository';
import { Store } from '../Store';

export interface EventService {
	listEvents(filters?: EventFilters): Promise<Event[]>;
}

export const api = (repository: EventRepository): EventService => {
	return new Store(repository);
};
