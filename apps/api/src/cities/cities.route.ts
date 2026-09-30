import type { FastifyInstance } from 'fastify';

import type { VacancyRepository } from '../vacancies/repository.js';

export function registerCityRoutes(app: FastifyInstance, repo: VacancyRepository): void {
  app.get('/api/cities', async (_request, reply) => {
    return reply.send({ items: await repo.listCities() });
  });
}
