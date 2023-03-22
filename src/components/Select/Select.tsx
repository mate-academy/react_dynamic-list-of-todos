import { memo } from 'react';
import { GetValue } from '../../types/GetValue';
import { Options } from '../../types/Options';

interface Props {
  disabled: boolean;
  onSelect: GetValue;
}

export const Select: React.FC<Props> = memo(
  ({ disabled, onSelect }) => (
    <span className="select">
      <select
        data-cy="statusSelect"
        disabled={disabled}
        onChange={(e) => onSelect(e.target.value)}
      >
        {Object.keys(Options).map((value) => (
          <option
            value={value.toLowerCase()}
            key={value}
          >
            {value}
          </option>
        ))}
      </select>
    </span>
  ),
);
