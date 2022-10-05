import React from 'react';
import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  filterBy: string,
  setFilterBy: (str: FilterTypes.all) => void,
  query: string,
  setQuery: (str: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearSearch = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleStatus}
          >
            <option value={FilterTypes.all}>All</option>
            <option value="FilterTypes.active">Active</option>
            <option value="FilterTypes.completed">Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearSearch}
            aria-label="Some text"
          />
        </span>
      </p>
    </form>
  );
};
