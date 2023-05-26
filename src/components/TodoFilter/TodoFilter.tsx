import React from 'react';

type Props = {
  selectFilter: string;
  filterTodos: (chooseSelect: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  applyQuery: (text: string) => void;
  reset: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectFilter,
  filterTodos,
  searchText,
  setSearchText,
  applyQuery,
  reset,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectFilter}
            onChange={(event) => filterTodos(event.target.value)}
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
          value={searchText}
          onChange={event => {
            setSearchText(event.target.value);
            applyQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
