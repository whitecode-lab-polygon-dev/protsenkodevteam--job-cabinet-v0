import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Dropdown } from './dropdown';

const options = [
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node' },
];

describe('Dropdown', () => {
  it('opens the list and reports a chosen value', async () => {
    const onChange = vi.fn();
    render(<Dropdown label="Технології" options={options} selected={[]} onChange={onChange} />);

    await userEvent.click(screen.getByRole('button', { name: /Технології/ }));
    await userEvent.click(screen.getByLabelText('React'));

    expect(onChange).toHaveBeenCalledWith(['react']);
  });

  it('removes a value that was already chosen', async () => {
    const onChange = vi.fn();
    render(
      <Dropdown label="Технології" options={options} selected={['react']} onChange={onChange} />,
    );

    await userEvent.click(screen.getByRole('button', { name: /Технології/ }));
    await userEvent.click(screen.getByLabelText('React'));

    expect(onChange).toHaveBeenCalledWith([]);
  });
});
