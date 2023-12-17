import React from 'react';
import { Filter } from '../../types/filterBy';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  setOption: (filter: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({ query, setQuery, setOption }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value as Filter);
  };

  const handleClearSearch = () => {
    if (query) {
      setQuery('');
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
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
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
