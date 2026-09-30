import { useEffect, useState } from 'react';
import type { Vacancy } from '@wcl/shared';

import { fetchVacancies } from '@/api/client';

export interface VacanciesState {
  vacancies: Vacancy[];
  total: number;
  loading: boolean;
  error: string | null;
}

export function useVacancies(): VacanciesState {
  const [state, setState] = useState<VacanciesState>({
    vacancies: [],
    total: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetchVacancies(controller.signal)
      .then((feed) =>
        setState({ vacancies: feed.items, total: feed.total, loading: false, error: null }),
      )
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          vacancies: [],
          total: 0,
          loading: false,
          error: error instanceof Error ? error.message : 'не вдалося завантажити стрічку',
        });
      });
    return () => controller.abort();
  }, []);

  return state;
}
