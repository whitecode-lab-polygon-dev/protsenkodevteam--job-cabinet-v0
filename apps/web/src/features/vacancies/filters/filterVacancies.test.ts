import { describe, expect, it } from 'vitest';
import type { Vacancy } from '@wcl/shared';

import { filterVacancies } from './filterVacancies';
import { EMPTY_FILTERS } from './types';

const vacancy = (id: string, extra: Partial<Vacancy> = {}): Vacancy => ({
  id,
  title: `Вакансія ${id}`,
  company: 'Acme',
  city: 'Київ',
  level: 'middle',
  format: 'remote',
  experience: 'up_to_3',
  stack: ['React', 'TypeScript'],
  salaryFrom: null,
  salaryTo: null,
  publishedAt: '2026-09-20',
  description: '',
  ...extra,
});

describe('filterVacancies', () => {
  it('returns everything when no filter is active', () => {
    const feed = [vacancy('a'), vacancy('b', { experience: 'none' })];
    expect(filterVacancies(feed, EMPTY_FILTERS)).toHaveLength(2);
  });

  it('keeps a vacancy when its experience is one of the chosen buckets', () => {
    const feed = [vacancy('a'), vacancy('b', { experience: 'none' }), vacancy('c', { experience: 'over_3' })];
    const found = filterVacancies(feed, { experience: ['none', 'over_3'] });
    expect(found.map((item) => item.id)).toEqual(['b', 'c']);
  });
});
