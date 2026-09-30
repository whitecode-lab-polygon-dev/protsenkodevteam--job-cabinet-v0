import { Link } from 'react-router-dom';
import { EXPERIENCE_LABELS, LEVEL_LABELS, WORK_FORMAT_LABELS } from '@wcl/shared';
import type { Vacancy } from '@wcl/shared';

interface VacancyCardProps {
  vacancy: Vacancy;
}

function salary(vacancy: Vacancy): string | null {
  if (vacancy.salaryFrom === null && vacancy.salaryTo === null) return null;
  if (vacancy.salaryTo === null) return `від $${vacancy.salaryFrom}`;
  if (vacancy.salaryFrom === null) return `до $${vacancy.salaryTo}`;
  return `$${vacancy.salaryFrom}–${vacancy.salaryTo}`;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const pay = salary(vacancy);

  return (
    <article className="vacancy-card" data-testid="vacancy-card">
      <h3 className="vacancy-card__title">
        <Link to={`/vacancy/${vacancy.id}`}>{vacancy.title}</Link>
      </h3>
      <p className="vacancy-card__company">
        {vacancy.company} · {vacancy.city}
      </p>
      <ul className="vacancy-card__tags">
        <li className="tag">{LEVEL_LABELS[vacancy.level]}</li>
        <li className="tag">{WORK_FORMAT_LABELS[vacancy.format]}</li>
        <li className="tag">{EXPERIENCE_LABELS[vacancy.experience]}</li>
        {vacancy.stack.map((technology) => (
          <li className="tag tag--stack" key={technology}>
            {technology}
          </li>
        ))}
      </ul>
      {pay ? <p className="vacancy-card__salary">{pay}</p> : null}
    </article>
  );
}
