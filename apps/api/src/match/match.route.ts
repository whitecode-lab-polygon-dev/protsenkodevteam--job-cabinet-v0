import type { FastifyInstance } from 'fastify';

import type { VacancyRepository } from '../vacancies/repository.js';
import { computeMatch } from './score.js';
import { findResumeById } from '../resumes/repository.js';

interface MatchRequestBody {
  resumeId: string;
  vacancyIds: string[];
}

interface MatchResponseItem {
  vacancyId: string;
  score: number;
  gaps: string;
}

export function registerMatchRoute(app: FastifyInstance, repo: VacancyRepository): void {
  app.post<{ Body: MatchRequestBody }>('/api/match', async (request, reply) => {
    const { resumeId, vacancyIds } = request.body;
    const resume = await findResumeById(resumeId);

    if (!resume) {
      return reply.code(404).send({ message: 'resume not found' });
    }

    const results: MatchResponseItem[] = [];

    for (const vacancyId of vacancyIds) {
      const vacancy = await repo.findVacancyById(vacancyId);
      const skills = await repo.findSkillsByVacancy(vacancyId);

      if (!vacancy) {
        continue;
      }

      const { score, gaps } = computeMatch(resume, { ...vacancy, skills });
      results.push({ vacancyId, score, gaps });
    }

    return reply.send({ results });
  });
}
