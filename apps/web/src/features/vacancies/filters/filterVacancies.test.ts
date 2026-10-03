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
    const found = filterVacancies(feed, { ...EMPTY_FILTERS, experience: ['none', 'over_3'] });
    expect(found.map((item) => item.id)).toEqual(['b', 'c']);
  });

  it('narrows the feed by a position, a technology or a company', () => {
    const feed = [
      vacancy('a', { title: 'Frontend Developer', company: 'Netpeak', stack: ['React'] }),
      vacancy('b', { title: 'Backend Developer', company: 'Acme', stack: ['Node'] }),
    ];
    const search = (query: string) =>
      filterVacancies(feed, { ...EMPTY_FILTERS, query }).map((item) => item.id);
    expect(search('frontend')).toEqual(['a']);
    expect(search('netpeak')).toEqual(['a']);
    expect(search('node')).toEqual(['b']);
    expect(search('developer')).toEqual(['a', 'b']);
  });

  it('ignores a query of spaces and keeps the experience filter working beside it', () => {
    const feed = [
      vacancy('a', { title: 'Frontend Developer', experience: 'none' }),
      vacancy('b', { title: 'Frontend Developer', experience: 'over_3' }),
    ];
    expect(filterVacancies(feed, { ...EMPTY_FILTERS, query: '   ' })).toHaveLength(2);
    expect(
      filterVacancies(feed, { experience: ['none'], query: 'frontend' }).map((item) => item.id),
    ).toEqual(['a']);
  });
});
