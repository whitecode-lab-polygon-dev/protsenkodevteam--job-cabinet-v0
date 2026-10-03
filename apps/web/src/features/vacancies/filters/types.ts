import type { ExperienceBucket } from '@wcl/shared';

// One place that says what the feed can be narrowed by. A new filter is a new field here, a
// branch in `filterVacancies` and a control in `FiltersPanel` — nothing else knows about it.
export interface VacancyFilters {
  experience: ExperienceBucket[];
  // Free text: a position, a technology or a company, which is what the search field promises.
  query: string;
}

export const EMPTY_FILTERS: VacancyFilters = { experience: [], query: '' };

export function hasActiveFilters(filters: VacancyFilters): boolean {
  return filters.experience.length > 0 || filters.query.trim() !== '';
}
