import express from 'express';
import { EventService } from '../../domain/services/event-service';
import { Event } from '../../domain/models/Event';

export async function startServer(port: number, service: EventService) {
	const app = express();

	app.get('/events', async (_req, res) => {
		const events: Event[] = await service.listEvents();
		res.send(events);
	});

	await new Promise((resolve) => app.listen(port, () => resolve(app)));
}
