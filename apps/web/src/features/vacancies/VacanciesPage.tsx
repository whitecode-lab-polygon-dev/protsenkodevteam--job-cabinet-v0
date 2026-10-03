import { useState } from 'react';

import { FiltersPanel } from './filters/FiltersPanel';
import { filterVacancies } from './filters/filterVacancies';
import { EMPTY_FILTERS, hasActiveFilters } from './filters/types';
import type { VacancyFilters } from './filters/types';
import { useVacancies } from './useVacancies';
import { VacancyCard } from './VacancyCard';

export function VacanciesPage() {
  const { vacancies, loading, error } = useVacancies();
  const [filters, setFilters] = useState<VacancyFilters>(EMPTY_FILTERS);
  const visible = filterVacancies(vacancies, filters);
  // The empty state answers for the filters, so it appears only when the filters are what emptied
  // the feed: not while the data is still on its way, not on a feed nobody has narrowed, and not
  // in place of an error.
  const emptyByFilters = !loading && !error && hasActiveFilters(filters) && visible.length === 0;

  return (
    <div className="vacancies-page">
      <h1 className="vacancies-page__title">Вакансії</h1>
      <FiltersPanel filters={filters} onChange={setFilters} />
      {error ? <p className="vacancies-page__error">{error}</p> : null}
      <div className="vacancies-page__feed" data-testid="vacancy-feed">
        {emptyByFilters ? <EmptyFeed onReset={() => setFilters(EMPTY_FILTERS)} /> : null}
        {loading || emptyByFilters
          ? null
          : visible.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)}
      </div>
    </div>
  );
}

// Resets through the same `EMPTY_FILTERS` the page starts from, so there is no second notion of
// "no filters" to keep in step with this one.
function EmptyFeed({ onReset }: { onReset: () => void }) {
  return (
    <div className="vacancies-page__empty">
      <p className="vacancies-page__empty-text">
        За такими фільтрами вакансій немає. Спробуй прибрати частину умов.
      </p>
      <button type="button" className="vacancies-page__reset" onClick={onReset}>
        Скинути фільтри
      </button>
    </div>
  );
}
