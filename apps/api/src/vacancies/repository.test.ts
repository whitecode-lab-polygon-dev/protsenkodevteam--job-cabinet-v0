import { describe, expect, it } from 'vitest';

import { createVacancyRepository } from './repository.js';

const repo = createVacancyRepository();

describe('createVacancyRepository', () => {
  it('returns the whole feed without a query', async () => {
    expect((await repo.listVacancies()).length).toBeGreaterThan(5);
  });

  it('narrows by city', async () => {
    const found = await repo.listVacancies({ city: 'Львів' });
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((vacancy) => vacancy.city === 'Львів')).toBe(true);
  });

  it('requires every requested technology at once', async () => {
    const found = await repo.listVacancies({ stack: ['React', 'GraphQL'] });
    expect(
      found.every(
        (vacancy) => vacancy.stack.includes('React') && vacancy.stack.includes('GraphQL'),
      ),
    ).toBe(true);
  });

  it('treats several levels as alternatives', async () => {
    const found = await repo.listVacancies({ level: ['junior', 'senior'] });
    expect(found.every((vacancy) => vacancy.level !== 'middle')).toBe(true);
  });

  it('lists the cities of the feed in alphabetical order', async () => {
    const cities = await repo.listCities();
    expect(cities).toEqual([...cities].sort((a, b) => a.localeCompare(b, 'uk')));
    expect(new Set(cities).size).toBe(cities.length);
  });

  it('answers with the vacancy stack for the match endpoint', async () => {
    expect(await repo.findSkillsByVacancy('v-001')).toContain('React');
    expect(await repo.findSkillsByVacancy('nope')).toEqual([]);
  });
});
