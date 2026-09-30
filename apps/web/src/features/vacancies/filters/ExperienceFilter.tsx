import { EXPERIENCE_BUCKETS, EXPERIENCE_LABELS } from '@wcl/shared';
import type { ExperienceBucket } from '@wcl/shared';

import { Dropdown } from '@/components/ui/dropdown';

interface ExperienceFilterProps {
  selected: ExperienceBucket[];
  onChange: (next: ExperienceBucket[]) => void;
}

const options = EXPERIENCE_BUCKETS.map((bucket) => ({
  value: bucket,
  label: EXPERIENCE_LABELS[bucket],
}));

export function ExperienceFilter({ selected, onChange }: ExperienceFilterProps) {
  return (
    <Dropdown
      label="Досвід"
      options={options}
      selected={selected}
      onChange={(next) => onChange(next as ExperienceBucket[])}
    />
  );
}
