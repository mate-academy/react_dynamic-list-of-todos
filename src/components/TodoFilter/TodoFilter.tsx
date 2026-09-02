import React, { useMemo, useState } from 'react';
import { debounce } from '../../utils/debounce';
import { FilterType } from '../../types/FilterTypes';

interface TodoFilterProps {
  onSelectFilter: (status: FilterType) => void;
  onSearch: (searchTerm: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onSelectFilter,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onSelectFilter(e.target.value as FilterType)}
          >
            <option value={FilterType.all}>All</option>
            <option value={FilterType.active}>Active</option>
            <option value={FilterType.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => {
            handleChange(e);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchTerm && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                debouncedSearch.cancel();
                setSearchTerm('');
                onSearch('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
