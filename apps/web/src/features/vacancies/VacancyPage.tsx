import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EXPERIENCE_LABELS, LEVEL_LABELS, WORK_FORMAT_LABELS } from '@wcl/shared';
import type { Vacancy } from '@wcl/shared';

import { fetchVacancy } from '@/api/client';

export function VacancyPage() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    fetchVacancy(id, controller.signal)
      .then(setVacancy)
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : 'вакансію не знайдено');
      });
    return () => controller.abort();
  }, [id]);

  if (error) return <p className="vacancy-page__error">{error}</p>;
  if (!vacancy) return <p className="vacancy-page__loading">Завантаження…</p>;

  return (
    <article className="vacancy-page">
      <Link className="vacancy-page__back" to="/">
        ← До стрічки
      </Link>
      <h1>{vacancy.title}</h1>
      <p className="vacancy-page__company">
        {vacancy.company} · {vacancy.city}
      </p>
      <ul className="vacancy-page__tags">
        <li className="tag">{LEVEL_LABELS[vacancy.level]}</li>
        <li className="tag">{WORK_FORMAT_LABELS[vacancy.format]}</li>
        <li className="tag">{EXPERIENCE_LABELS[vacancy.experience]}</li>
      </ul>
      <p className="vacancy-page__description">{vacancy.description}</p>
      <h2>Стек</h2>
      <ul className="vacancy-page__stack">
        {vacancy.stack.map((technology) => (
          <li className="tag tag--stack" key={technology}>
            {technology}
          </li>
        ))}
      </ul>
    </article>
  );
}
