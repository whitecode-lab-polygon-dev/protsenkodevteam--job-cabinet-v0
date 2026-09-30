import type { Vacancy } from '@wcl/shared';

import { vacancies } from '../data/vacancies.js';

export interface VacancyQuery {
  city?: string;
  level?: string[];
  format?: string[];
  stack?: string[];
}

// Async on purpose: the mock list is the first implementation of an interface that a real
// database will fill in later, and the routes are written against the interface.
export interface VacancyRepository {
  listVacancies(query?: VacancyQuery): Promise<Vacancy[]>;
  findVacancyById(id: string): Promise<Vacancy | undefined>;
  findSkillsByVacancy(id: string): Promise<string[]>;
  listCities(): Promise<string[]>;
}

function matchesQuery(vacancy: Vacancy, query: VacancyQuery): boolean {
  if (query.city && vacancy.city !== query.city) return false;
  if (query.level?.length && !query.level.includes(vacancy.level)) return false;
  if (query.format?.length && !query.format.includes(vacancy.format)) return false;
  if (query.stack?.length) {
    const stack = vacancy.stack.map((item) => item.toLowerCase());
    const wanted = query.stack.map((item) => item.toLowerCase());
    if (!wanted.every((item) => stack.includes(item))) return false;
  }
  return true;
}

export function createVacancyRepository(source: Vacancy[] = vacancies): VacancyRepository {
  return {
    async listVacancies(query = {}) {
      return source.filter((vacancy) => matchesQuery(vacancy, query));
    },
    async findVacancyById(id) {
      return source.find((vacancy) => vacancy.id === id);
    },
    async findSkillsByVacancy(id) {
      return source.find((vacancy) => vacancy.id === id)?.stack ?? [];
    },
    async listCities() {
      return [...new Set(source.map((vacancy) => vacancy.city))].sort((a, b) =>
        a.localeCompare(b, 'uk'),
      );
    },
  };
}
