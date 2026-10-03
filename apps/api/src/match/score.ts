export interface MatchResumeInput {
  skills: string[];
}

export interface MatchVacancyInput {
  skills: string[];
}

export interface MatchResult {
  score: number;
  gaps: string;
}

export function computeMatch(resume: MatchResumeInput, vacancy: MatchVacancyInput): MatchResult {
  const resumeSkills = new Set(resume.skills.map((skill) => skill.toLowerCase()));
  const vacancySkills = vacancy.skills.map((skill) => skill.toLowerCase());

  if (vacancySkills.length === 0) {
    return { score: 100, gaps: '' };
  }

  const missing: string[] = [];
  let matched = 0;

  for (const skill of vacancySkills) {
    if (resumeSkills.has(skill)) {
      matched += 1;
    } else {
      missing.push(skill);
    }
  }

  const score = Math.round((matched / vacancySkills.length) * 100);
  const gaps = missing.map((skill) => `немає досвіду з ${skill}`).join(', ');

  return { score, gaps };
}
