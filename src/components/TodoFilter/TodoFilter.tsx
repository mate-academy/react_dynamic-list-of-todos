import React from 'react';
import { useTodos } from '../../utils/TodosContext';
import { Filter } from '../../types/Context';

export const TodoFilter = () => {
  const { setFilter, query, setQuery } = useTodos();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Filter;

    setFilter(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value={Filter.ALL}>{Filter.ALL}</option>
            <option value={Filter.ACTIVE}>{Filter.ACTIVE}</option>
            <option value={Filter.COMPLETED}>{Filter.COMPLETED}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
