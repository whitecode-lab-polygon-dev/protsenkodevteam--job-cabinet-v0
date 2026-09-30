// Domain vocabulary shared by the API and the web app. Levels, work formats and experience
// buckets are values the UI filters on, so they live here instead of being spelled out twice.

export const LEVELS = ['junior', 'middle', 'senior'] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_LABELS: Record<Level, string> = {
  junior: 'Джуніор',
  middle: 'Мідл',
  senior: 'Сеньйор',
};

export const WORK_FORMATS = ['office', 'remote', 'hybrid'] as const;
export type WorkFormat = (typeof WORK_FORMATS)[number];

export const WORK_FORMAT_LABELS: Record<WorkFormat, string> = {
  office: 'Офіс',
  remote: 'Віддалено',
  hybrid: 'Гібрид',
};

export const EXPERIENCE_BUCKETS = ['none', 'up_to_3', 'over_3'] as const;
export type ExperienceBucket = (typeof EXPERIENCE_BUCKETS)[number];

export const EXPERIENCE_LABELS: Record<ExperienceBucket, string> = {
  none: 'Без досвіду',
  up_to_3: 'До 3 років',
  over_3: 'Понад 3 роки',
};

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  city: string;
  level: Level;
  format: WorkFormat;
  experience: ExperienceBucket;
  stack: string[];
  salaryFrom: number | null;
  salaryTo: number | null;
  publishedAt: string;
  description: string;
}

export interface Resume {
  id: string;
  title: string;
  skills: string[];
  level: Level;
}

export interface MatchResult {
  score: number;
  gaps: string[];
}

export function experienceOf(years: number): ExperienceBucket {
  if (years <= 0) return 'none';
  return years <= 3 ? 'up_to_3' : 'over_3';
}

export function isLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value);
}

export function isWorkFormat(value: string): value is WorkFormat {
  return (WORK_FORMATS as readonly string[]).includes(value);
}
