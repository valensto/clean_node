import { startServer } from './src/adapters/rest/express';
import { EventService, api } from './src/domain/services/event-service';
import { InMemoryEvents } from './src/infrastructure/databases/InMemoryEvents';

const Repository = new InMemoryEvents();
Repository.populateFakeEvents();

export const service = (): EventService => api(Repository);

const PORT = process.env.PORT || '3000';

startServer(parseInt(PORT), service())
	.then(() => console.log(`http://0.0.0.0:${PORT} is running`))
	.catch((err) => console.error(err));
