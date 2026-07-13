import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FilterValue, TodosFilter } from '../../types/TodoFilter';

interface Props {
  onQueryChange: (value: string) => void;
  filterValue: string;
  onStatusChange: (value: FilterValue) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterValue,
  onQueryChange,
  onStatusChange,
}) => {
  const [localValue, setLocalValue] = useState(filterValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => onQueryChange(value), 500),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setLocalValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    debouncedSearch.cancel();
    onQueryChange('');
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onStatusChange(e.target.value as FilterValue)}
          >
            <option value={TodosFilter.ALL}>{TodosFilter.ALL}</option>
            <option value={TodosFilter.ACTIVE}>{TodosFilter.ACTIVE}</option>
            <option value={TodosFilter.COMPLETED}>
              {TodosFilter.COMPLETED}
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={localValue}
          onChange={handleInputChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {localValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
