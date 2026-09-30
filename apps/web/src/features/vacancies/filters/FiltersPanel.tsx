import type { ExperienceBucket } from '@wcl/shared';

import { ExperienceFilter } from './ExperienceFilter';
import type { VacancyFilters } from './types';

interface FiltersPanelProps {
  filters: VacancyFilters;
  onChange: (next: VacancyFilters) => void;
}

// The panel above the feed. Every filter is a control here plus a branch in `filterVacancies`.
export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  return (
    <section className="filters-panel" aria-label="Фільтри">
      <ExperienceFilter
        selected={filters.experience}
        onChange={(experience: ExperienceBucket[]) => onChange({ ...filters, experience })}
      />
    </section>
  );
}
