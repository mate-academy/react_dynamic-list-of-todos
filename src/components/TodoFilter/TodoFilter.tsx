import React, { memo, useCallback } from 'react';

export type Props = {
  searchQuery: string
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  complitedFilter: string;
  setComplitedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = memo(({
  searchQuery,
  onSearch,
  complitedFilter,
  setComplitedFilter,
}) => {
  const handleDelete = useCallback(() => {
    onSearch('');
  }, []);

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={complitedFilter}
            onChange={(event) => setComplitedFilter(event.target.value)}
          >
            <option value="all">
              All
            </option>
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
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchQuery
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleDelete}
              />
            </span>
          )}

      </p>
    </form>
  );
});
