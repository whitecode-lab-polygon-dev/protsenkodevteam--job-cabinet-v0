import type { Vacancy } from '@wcl/shared';

import type { VacancyFilters } from './types';

export function filterVacancies(vacancies: Vacancy[], filters: VacancyFilters): Vacancy[] {
  const query = filters.query.trim().toLowerCase();
  return vacancies.filter((vacancy) => {
    if (filters.experience.length > 0 && !filters.experience.includes(vacancy.experience)) {
      return false;
    }
    // The three things the field's placeholder promises: a position, a technology, a company.
    if (query && !matches(vacancy, query)) return false;
    return true;
  });
}

function matches(vacancy: Vacancy, query: string): boolean {
  const haystack = [vacancy.title, vacancy.company, ...vacancy.stack];
  return haystack.some((value) => value.toLowerCase().includes(query));
}
