import { memo } from 'react';
import { GetValue } from '../../types/GetValue';
import { Option } from '../../types/Option';

interface Props {
  options: Option[];
  disabled: boolean;
  onSelect: GetValue;
}

export const Select: React.FC<Props> = memo(
  ({ options, disabled, onSelect }) => (
    <span className="select">
      <select
        data-cy="statusSelect"
        disabled={disabled}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map(({ title, value }) => (
          <option
            value={value}
            key={value}
          >
            {title}
          </option>
        ))}
      </select>
    </span>
  ),
);
