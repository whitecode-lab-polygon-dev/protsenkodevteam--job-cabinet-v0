import type { Resume } from '@wcl/shared';

import { resumes } from '../data/resumes.js';

export async function findResumeById(id: string): Promise<Resume | undefined> {
  return resumes.find((resume) => resume.id === id);
}

export async function listResumes(): Promise<Resume[]> {
  return resumes;
}
