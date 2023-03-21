import { memo } from 'react';
import { Input } from '../Input';
import { Select } from '../Select';
import { GetValue } from '../../types/GetValue';

interface Props {
  query: string;
  disabled: boolean;
  onSelect: GetValue;
  onChange: GetValue;
}

export const TodoFilter: React.FC<Props> = memo(
  ({
    query,
    disabled,
    onChange,
    onSelect,
  }) => (
    <form className="field has-addons">
      <div className="control">
        <Select
          disabled={disabled}
          onSelect={onSelect}
        />
      </div>

      <div className="control is-expanded has-icons-left has-icons-right">
        <Input
          value={query}
          onChange={onChange}
        />
      </div>
    </form>
  ),
);
