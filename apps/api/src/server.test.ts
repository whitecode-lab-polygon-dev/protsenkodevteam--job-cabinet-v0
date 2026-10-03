import { describe, expect, it } from 'vitest';

import { buildServer } from './server.js';

const app = buildServer();

describe('GET /api/vacancies', () => {
  it('returns the feed with a total', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/vacancies' });
    expect(response.statusCode).toBe(200);
    const body = response.json<{ items: unknown[]; total: number }>();
    expect(body.total).toBe(body.items.length);
    expect(body.total).toBeGreaterThan(0);
  });

  it('filters by city and by several technologies at once', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/vacancies?city=Київ&stack=React,TypeScript',
    });
    const body = response.json<{ items: Array<{ city: string; stack: string[] }> }>();
    expect(body.items.length).toBeGreaterThan(0);
    for (const vacancy of body.items) {
      expect(vacancy.city).toBe('Київ');
      expect(vacancy.stack).toContain('React');
      expect(vacancy.stack).toContain('TypeScript');
    }
  });
});

describe('GET /api/vacancies/:id', () => {
  it('returns one vacancy', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/vacancies/v-001' });
    expect(response.statusCode).toBe(200);
    expect(response.json<{ id: string }>().id).toBe('v-001');
  });

  it('answers 404 for an unknown id', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/vacancies/nope' });
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /api/cities', () => {
  it('lists the cities of the feed', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/cities' });
    expect(response.statusCode).toBe(200);
    expect(response.json<{ items: string[] }>().items).toContain('Київ');
  });
});

describe('POST /api/match', () => {
  it('scores the vacancies of the request against the resume', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/match',
      payload: { resumeId: 'r-001', vacancyIds: ['v-001'] },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json<{ results: Array<{ vacancyId: string; score: number }> }>();
    expect(body.results[0]?.vacancyId).toBe('v-001');
    expect(body.results[0]?.score).toBe(100);
  });
});
