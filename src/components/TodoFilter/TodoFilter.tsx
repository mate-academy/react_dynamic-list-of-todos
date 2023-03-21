import { memo } from 'react';
import { Input } from '../Input';
import { Select } from '../Select';
import { Option } from '../../types/Option';
import { GetValue } from '../../types/GetValue';

interface Props {
  query: string;
  disabled: boolean;
  filterByOptions: Option[];
  onSelect: GetValue;
  onChange: GetValue;
}

export const TodoFilter: React.FC<Props> = memo(
  ({
    query,
    disabled,
    filterByOptions,
    onChange,
    onSelect,
  }) => (
    <form className="field has-addons">
      <div className="control">
        <Select
          disabled={disabled}
          options={filterByOptions}
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
