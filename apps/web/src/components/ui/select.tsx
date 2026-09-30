export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (next: string) => void;
}

// Base single-choice control of the design system.
export function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <select
      className="select"
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
