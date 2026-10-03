import type { ExperienceBucket } from '@wcl/shared';

import { ExperienceFilter } from './ExperienceFilter';
import type { VacancyFilters } from './types';

interface FiltersPanelProps {
  filters: VacancyFilters;
  onChange: (next: VacancyFilters) => void;
}

export const SEARCH_PLACEHOLDER = 'Посада, технологія або компанія';

// The panel above the feed. Every filter is a control here plus a branch in `filterVacancies`.
export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  return (
    <section className="filters-panel" aria-label="Фільтри">
      <input
        type="search"
        className="filters-panel__search"
        aria-label="Пошук вакансій"
        placeholder={SEARCH_PLACEHOLDER}
        value={filters.query}
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
      />
      <ExperienceFilter
        selected={filters.experience}
        onChange={(experience: ExperienceBucket[]) => onChange({ ...filters, experience })}
      />
    </section>
  );
}
