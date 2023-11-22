import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  setFilter: (value: Filter) => void,
  search: string,
  setSearch: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  const handleSetFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  };

  const handleSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={handleSetFilter}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={search}
          onChange={handleSetSearch}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={clearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
