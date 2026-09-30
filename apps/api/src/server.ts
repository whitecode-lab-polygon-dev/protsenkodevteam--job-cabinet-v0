import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import { registerCityRoutes } from './cities/cities.route.js';
import { registerMatchRoute } from './match/match.route.js';
import { createVacancyRepository } from './vacancies/repository.js';
import type { VacancyRepository } from './vacancies/repository.js';
import { registerVacancyRoutes } from './vacancies/vacancies.route.js';

export interface ServerOptions {
  repository?: VacancyRepository;
  logger?: boolean;
}

export function buildServer(options: ServerOptions = {}): FastifyInstance {
  const app = Fastify({ logger: options.logger ?? false });
  const repo = options.repository ?? createVacancyRepository();

  app.get('/api/health', async () => ({ status: 'ok' }));
  registerVacancyRoutes(app, repo);
  registerCityRoutes(app, repo);
  registerMatchRoute(app, repo);

  return app;
}
