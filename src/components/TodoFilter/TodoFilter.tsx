import React from 'react';
import { Filter } from '../../types/FilterBy';

type Props = {
  query: string,
  onChangeFilter: (filterBy: Filter) => void,
  onChangeQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeFilter,
  onChangeQuery,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.target.value as Filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(e.target.value);
  };

  const handleDeleteSearch = () => {
    if (query) {
      onChangeQuery('');
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          onChange={handleSearchChange}
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
              onClick={handleDeleteSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
