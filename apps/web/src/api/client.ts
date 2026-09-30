import type { Vacancy } from '@wcl/shared';

export interface VacancyFeed {
  items: Vacancy[];
  total: number;
}

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) throw new Error(`${path} answered ${response.status}`);
  return (await response.json()) as T;
}

export function fetchVacancies(signal?: AbortSignal): Promise<VacancyFeed> {
  return getJson<VacancyFeed>('/api/vacancies', signal);
}

export function fetchVacancy(id: string, signal?: AbortSignal): Promise<Vacancy> {
  return getJson<Vacancy>(`/api/vacancies/${id}`, signal);
}

export function fetchCities(signal?: AbortSignal): Promise<{ items: string[] }> {
  return getJson<{ items: string[] }>('/api/cities', signal);
}
