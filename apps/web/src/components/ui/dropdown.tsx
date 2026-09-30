import { useId, useState } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selected: string[];
  onChange: (next: string[]) => void;
}

// Base dropdown of the design system: a button that opens a list of checkboxes. Every
// multi-select filter in the panel is built on it, so they behave the same way.
export function Dropdown({ label, options, selected, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropdown__button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((previous) => !previous)}
      >
        {label}
        {selected.length > 0 ? <span className="dropdown__badge">{selected.length}</span> : null}
      </button>
      <div className="dropdown__list" id={listId} role="group" aria-label={label} hidden={!open}>
        {options.map((option) => (
          <label className="dropdown__option" key={option.value}>
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
