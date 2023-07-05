import React from 'react';
import { StatusFilter } from '../../types/StatusFilter';

interface Props {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = React.memo(({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const { All, Active, Completed } = StatusFilter;
  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClickDeleteButton = (() => {
    setSearchQuery('');
  });

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleChangeFilter}
          >
            <option value={All}>All</option>
            <option value={Active}>Active</option>
            <option value={Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClickDeleteButton}
              aria-label="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
});
