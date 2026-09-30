import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Vacancy } from '@wcl/shared';

import { VacancyCard } from './VacancyCard';

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

describe('VacancyCard', () => {
  it('shows the title, the company, the city and the stack', () => {
    render(
      <MemoryRouter>
        <VacancyCard vacancy={vacancy} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Frontend Developer' })).toHaveAttribute(
      'href',
      '/vacancy/v-001',
    );
    expect(screen.getByText(/Netpeak/)).toHaveTextContent('Київ');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('$800–1200')).toBeInTheDocument();
  });

  it('says nothing about pay when the vacancy hides it', () => {
    render(
      <MemoryRouter>
        <VacancyCard vacancy={{ ...vacancy, salaryFrom: null, salaryTo: null }} />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
  });
});
