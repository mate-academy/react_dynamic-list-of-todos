/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodoContext';
import { FILTER } from '../../types/filterEnum';

export const TodoFilter = () => {
  const {
    searchField, filterField, onUpdateFilter, onUpdateSearch,
  }
    = useContext(TodosContext);

  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;

    onUpdateSearch(term);
  };

  const updateFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const term = event.target.value;

    onUpdateFilter(term as FILTER);
  };

  const onCloseSearch = () => {
    onUpdateSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filterField}
            data-cy="statusSelect"
            onChange={updateFilter}
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
          value={searchField}
          onChange={updateSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchField && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onCloseSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
