import React from 'react';
import { todoContext } from '../../contexts/TodoContext';
import { FilterType } from '../../types/FilterType';

export const TodoFilter = () => {
  const { setSelectedFilter, setSearchTitle, handleSearchChange, searchTitle } =
    React.useContext(todoContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => {
              setSelectedFilter(event.target.value as FilterType);
            }}
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
          data-cy="searchInput"
          onChange={handleSearchChange}
          value={searchTitle}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchTitle && (
            <button
              data-cy="clearSearchButton"
              type="button"
              onClick={setSearchTitle.bind(null, '')}
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
