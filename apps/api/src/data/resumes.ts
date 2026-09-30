import type { Resume } from '@wcl/shared';

export const resumes: Resume[] = [
  {
    id: 'r-001',
    title: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'CSS'],
    level: 'junior',
  },
  {
    id: 'r-002',
    title: 'Fullstack Developer',
    skills: ['React', 'Node', 'TypeScript', 'PostgreSQL'],
    level: 'middle',
  },
  // Deliberately thin: /api/match has to answer for an almost empty resume too.
  { id: 'r-003', title: 'Початківець', skills: [], level: 'junior' },
];
