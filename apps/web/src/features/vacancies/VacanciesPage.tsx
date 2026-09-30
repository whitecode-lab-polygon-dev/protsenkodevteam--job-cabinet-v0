import { useState } from 'react';

import { FiltersPanel } from './filters/FiltersPanel';
import { filterVacancies } from './filters/filterVacancies';
import { EMPTY_FILTERS } from './filters/types';
import type { VacancyFilters } from './filters/types';
import { useVacancies } from './useVacancies';
import { VacancyCard } from './VacancyCard';

export function VacanciesPage() {
  const { vacancies, loading, error } = useVacancies();
  const [filters, setFilters] = useState<VacancyFilters>(EMPTY_FILTERS);
  const visible = filterVacancies(vacancies, filters);

  return (
    <div className="vacancies-page">
      <h1 className="vacancies-page__title">Вакансії</h1>
      <FiltersPanel filters={filters} onChange={setFilters} />
      {error ? <p className="vacancies-page__error">{error}</p> : null}
      <div className="vacancies-page__feed" data-testid="vacancy-feed">
        {loading
          ? null
          : visible.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)}
      </div>
    </div>
  );
}
