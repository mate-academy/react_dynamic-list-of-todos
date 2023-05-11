import React, { useCallback } from 'react';

type TodoFilterProps = {
  onFilterSelect: (filter: string) => void;
  onSearchChange: (search: string) => void;
  search: string;
  filter: string;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterSelect: onSelectFilter,
  onSearchChange: onChangeSearch,
  search,
  filter,
}) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSearch(e.target.value);
    }, [onChangeSearch],
  );

  const handleSearchClear = useCallback(() => {
    onChangeSearch('');
  }, [onChangeSearch]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => onSelectFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleSearchClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
