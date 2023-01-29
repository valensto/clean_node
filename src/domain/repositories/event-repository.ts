import { EventFilters } from '../models/types';
import { Event } from '../models/Event';

export interface EventRepository {
	findFilteredEvents(filters: EventFilters): Promise<Event[]>;
}
