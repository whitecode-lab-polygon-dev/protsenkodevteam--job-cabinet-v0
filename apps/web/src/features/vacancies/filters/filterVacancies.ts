import type { Vacancy } from '@wcl/shared';

import type { VacancyFilters } from './types';

export function filterVacancies(vacancies: Vacancy[], filters: VacancyFilters): Vacancy[] {
  return vacancies.filter((vacancy) => {
    if (filters.experience.length > 0 && !filters.experience.includes(vacancy.experience)) {
      return false;
    }
    return true;
  });
}
