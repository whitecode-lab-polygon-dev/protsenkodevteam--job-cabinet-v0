import { describe, expect, it } from 'vitest';

import { computeMatch } from './score.js';

describe('computeMatch', () => {
  it('returns 100 when all vacancy skills are present in the resume', () => {
    const resume = { id: 'r1', skills: ['React', 'TypeScript', 'Node'] };
    const vacancy = { id: 'v1', skills: ['React', 'TypeScript'] };

    const result = computeMatch(resume, vacancy);

    expect(result.score).toBe(100);
    expect(result.gaps).toBe('');
  });

  it('returns a partial score when some vacancy skills are missing', () => {
    const resume = { id: 'r1', skills: ['React'] };
    const vacancy = { id: 'v1', skills: ['React', 'GraphQL'] };

    const result = computeMatch(resume, vacancy);

    expect(result.score).toBe(50);
    expect(result.gaps).toContain('graphql');
  });

  it('ignores resume skills that the vacancy does not require', () => {
    const resume = { id: 'r1', skills: ['React', 'Docker', 'Kubernetes'] };
    const vacancy = { id: 'v1', skills: ['React'] };

    const result = computeMatch(resume, vacancy);

    expect(result.score).toBe(100);
    expect(result.gaps).toBe('');
  });

  it('is case-insensitive when comparing skills', () => {
    const resume = { id: 'r1', skills: ['react'] };
    const vacancy = { id: 'v1', skills: ['React'] };

    const result = computeMatch(resume, vacancy);

    expect(result.score).toBe(100);
  });
});
