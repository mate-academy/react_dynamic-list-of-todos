import React from 'react';

type Props = {
  searchFilter: string;
  setSearchFilter: (a: string) => void;
  completedSearch: string;
  setCompletedSearch: (a: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchFilter,
  setSearchFilter,
  completedSearch,
  setCompletedSearch,
}) => {
  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const clearSearch = () => {
    setSearchFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedSearch}
            onChange={e => {
              setCompletedSearch(e.target.value);
            }}
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
          value={searchFilter}
          onChange={handleInputFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchFilter.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
