import React from 'react';
import { useTodos } from '../../store/Store';
import { FilterType } from '../../types/FilterBy';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter, query, handleChangeQuery, setQuery } = useTodos();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilterType;

    setFilter(selectedFilter);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleForm}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value={FilterType.ALL}>All</option>

            <option value={FilterType.ACTIVE}>Active</option>

            <option value={FilterType.COMPLETED}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
