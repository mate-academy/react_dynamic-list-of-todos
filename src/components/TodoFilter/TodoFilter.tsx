import React, { useCallback, useContext, useState } from 'react';
import { Filter } from '../../types/Filter';
import { StateContext, DispatchContext } from '../../context/TodoContext';
import { debounce } from '../../services/debounce';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const { filterType, setFilter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Filter;

    dispatch({ type: 'changeFilterValue', filterType: selectedFilter });
  };

  const debouncedSetFilter = useCallback(
    debounce((filter: string) => setFilter(filter), 500),
    [setFilter]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    debouncedSetFilter(value);
  };

  const handleClear = () => {
    setQuery('');
    setFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
            value={filterType}
          >
            {Object.values(Filter).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClear}
          />
        </span>
      </p>
    </form>
  );
};
