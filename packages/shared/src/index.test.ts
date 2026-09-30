import { describe, expect, it } from 'vitest';

import { experienceOf, isLevel, isWorkFormat } from './index.js';

describe('experienceOf', () => {
  it('maps years onto the buckets the filters use', () => {
    expect(experienceOf(0)).toBe('none');
    expect(experienceOf(2)).toBe('up_to_3');
    expect(experienceOf(3)).toBe('up_to_3');
    expect(experienceOf(4)).toBe('over_3');
  });
});

describe('guards', () => {
  it('accept known values only', () => {
    expect(isLevel('middle')).toBe(true);
    expect(isLevel('lead')).toBe(false);
    expect(isWorkFormat('remote')).toBe(true);
    expect(isWorkFormat('anywhere')).toBe(false);
  });
});
