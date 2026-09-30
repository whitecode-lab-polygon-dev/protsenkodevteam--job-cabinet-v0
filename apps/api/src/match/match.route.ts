import type { FastifyInstance } from 'fastify';

import type { VacancyRepository } from '../vacancies/repository.js';

// The scoring itself is not written yet. The route exists so the contract is visible from the
// first day: POST /api/match answers a score and the gaps for a resume and a vacancy.
export function registerMatchRoute(app: FastifyInstance, _repo: VacancyRepository): void {
  app.post('/api/match', async (_request, reply) => {
    return reply.code(501).send({ message: 'match scoring is not implemented yet' });
  });
}
