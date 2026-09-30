# job-cabinet-v0

Кабінет пошуку роботи: стрічка вакансій з фільтрами, картка вакансії і невеликий API на моках.
Це полігон WhiteCode Lab — у ньому виконуються тікети спринту, а код навколо вже працює.

```sh
pnpm install
pnpm dev        # API на :3001, фронт на :5173
pnpm test       # vitest у всіх пакетах
pnpm lint
pnpm typecheck
```

## Структура

```
apps/web         Vite + React + TypeScript. Стрічка, картка, панель фільтрів, дизайн-система.
apps/api         Fastify. /api/vacancies, /api/vacancies/:id, /api/cities, /api/match.
packages/shared  Спільні типи і довідники: рівні, формати роботи, досвід, Vacancy, Resume.
```

Дані вакансій і резюме — моки в `apps/api/src/data`. Бази немає: репозиторій
(`apps/api/src/vacancies/repository.ts`) — це інтерфейс, за яким колись стане справжнє сховище,
тому маршрути написані проти інтерфейсу, а не проти масиву.

## Де що робити

| Тікет | Про що | Куди дивитись |
| --- | --- | --- |
| JC-03 | Мультивибір технологій | `apps/web/src/features/vacancies/filters/`, довідник `apps/web/src/data/stack.ts` |
| JC-04 | Рівень і формат роботи | ті самі фільтри; enum'и в `packages/shared` |
| JC-05 | Стан фільтрів в URL | `VacanciesPage`, `react-router-dom` |
| JC-06 | POST /api/match | `apps/api/src/match/` — зараз заглушка 501 |
| JC-07 | Фільтр за містом | `apps/web/src/data/cities.ts`, базовий `Select` |
| JC-08 | Порожній стан | `VacanciesPage` |
| JC-09 | Скидання фільтрів | `filters/types.ts` (`EMPTY_FILTERS`, `hasActiveFilters`) |
| JC-10 | Лічильник і скелетон | `features/vacancies/`, `components/ui/skeleton.tsx` |
| JC-11 | Бейдж збігу | `VacancyCard` |
| JC-12 | Сортування за збігом | `VacanciesPage` |
| JC-13 | Пробіли збігу на картці | `VacancyCard` |

Новий фільтр — це поле у `VacancyFilters`, гілка у `filterVacancies` і контрол у `FiltersPanel`.
Більше нічого про фільтри не знає, тому їх можна додавати паралельно.
