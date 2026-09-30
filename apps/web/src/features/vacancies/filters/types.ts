import type { ExperienceBucket } from '@wcl/shared';

// One place that says what the feed can be narrowed by. A new filter is a new field here, a
// branch in `filterVacancies` and a control in `FiltersPanel` — nothing else knows about it.
export interface VacancyFilters {
  experience: ExperienceBucket[];
}

export const EMPTY_FILTERS: VacancyFilters = { experience: [] };

export function hasActiveFilters(filters: VacancyFilters): boolean {
  return filters.experience.length > 0;
}
