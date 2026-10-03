import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Vacancy } from '@wcl/shared';

import { VacanciesPage } from './VacanciesPage';

// The feed comes from the API; what JC-08 is about is what the page does with an empty result,
// so the hook is the seam the test replaces.
const mocks = vi.hoisted(() => ({
  state: { vacancies: [] as Vacancy[], total: 0, loading: false, error: null as string | null },
}));

vi.mock('./useVacancies', () => ({ useVacancies: () => mocks.state }));

const vacancy: Vacancy = {
  id: 'v-001',
  title: 'Frontend Developer',
  company: 'Netpeak',
  city: 'Київ',
  level: 'junior',
  format: 'hybrid',
  experience: 'none',
  stack: ['React', 'TypeScript'],
  salaryFrom: 800,
  salaryTo: 1200,
  publishedAt: '2026-09-21',
  description: '',
};

const EMPTY_TEXT = /вакансій немає/;

const show = () =>
  render(
    <MemoryRouter>
      <VacanciesPage />
    </MemoryRouter>,
  );

describe('VacanciesPage', () => {
  beforeEach(() => {
    mocks.state = { vacancies: [vacancy], total: 1, loading: false, error: null };
  });

  it('explains an empty result and gives the whole feed back on one click', async () => {
    const user = userEvent.setup();
    show();
    expect(screen.getByRole('link', { name: 'Frontend Developer' })).toBeInTheDocument();

    await user.type(screen.getByLabelText('Пошук вакансій'), 'golang');

    expect(screen.getByText(EMPTY_TEXT)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Frontend Developer' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Скинути фільтри' }));

    expect(screen.getByRole('link', { name: 'Frontend Developer' })).toBeInTheDocument();
    expect(screen.queryByText(EMPTY_TEXT)).not.toBeInTheDocument();
    // The reset is the filters themselves, so the search field is empty too.
    expect(screen.getByLabelText('Пошук вакансій')).toHaveValue('');
  });

  it('says nothing while the feed is still loading', async () => {
    mocks.state = { vacancies: [], total: 0, loading: true, error: null };
    const user = userEvent.setup();
    show();

    await user.type(screen.getByLabelText('Пошук вакансій'), 'golang');

    expect(screen.queryByText(EMPTY_TEXT)).not.toBeInTheDocument();
  });

  it('says nothing on a feed nobody has filtered', () => {
    mocks.state = { vacancies: [], total: 0, loading: false, error: null };
    show();

    expect(screen.queryByText(EMPTY_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Скинути фільтри' })).not.toBeInTheDocument();
  });
});
