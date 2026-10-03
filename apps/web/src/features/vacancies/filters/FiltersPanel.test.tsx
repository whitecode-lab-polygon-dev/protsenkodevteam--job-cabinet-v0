import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FiltersPanel, SEARCH_PLACEHOLDER } from './FiltersPanel';
import { EMPTY_FILTERS } from './types';

describe('FiltersPanel', () => {
  it('shows the search field with its placeholder', () => {
    render(<FiltersPanel filters={EMPTY_FILTERS} onChange={() => {}} />);
    expect(screen.getByPlaceholderText(SEARCH_PLACEHOLDER)).toBeInTheDocument();
    expect(SEARCH_PLACEHOLDER).toBe('Посада, технологія або компанія');
  });

  it('hands the typed query back to the feed', async () => {
    const onChange = vi.fn();
    render(<FiltersPanel filters={EMPTY_FILTERS} onChange={onChange} />);

    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'React');

    // A controlled field: every keystroke is one call with the whole filters object.
    expect(onChange).toHaveBeenCalledWith({ ...EMPTY_FILTERS, query: 'R' });
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
