import type { FastifyInstance } from 'fastify';

import type { VacancyRepository } from './repository.js';

interface FeedQuery {
  city?: string;
  level?: string;
  format?: string;
  stack?: string;
}

function list(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

export function registerVacancyRoutes(app: FastifyInstance, repo: VacancyRepository): void {
  app.get<{ Querystring: FeedQuery }>('/api/vacancies', async (request) => {
    const { city, level, format, stack } = request.query;
    const items = await repo.listVacancies({
      city: city || undefined,
      level: list(level),
      format: list(format),
      stack: list(stack),
    });
    return { items, total: items.length };
  });

  app.get<{ Params: { id: string } }>('/api/vacancies/:id', async (request, reply) => {
    const vacancy = await repo.findVacancyById(request.params.id);
    if (!vacancy) return reply.code(404).send({ message: 'vacancy not found' });
    return vacancy;
  });
}
