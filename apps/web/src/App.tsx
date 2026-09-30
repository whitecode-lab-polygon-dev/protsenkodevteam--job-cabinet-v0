import { Link, Route, Routes } from 'react-router-dom';

import { VacanciesPage } from '@/features/vacancies/VacanciesPage';
import { VacancyPage } from '@/features/vacancies/VacancyPage';

export function App() {
  return (
    <div className="app">
      <header className="app__header">
        <Link className="app__brand" to="/">
          Job Cabinet
        </Link>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<VacanciesPage />} />
          <Route path="/vacancy/:id" element={<VacancyPage />} />
        </Routes>
      </main>
    </div>
  );
}
