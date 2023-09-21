import React from 'react';
import { Filter } from '../../types/Filter';

type TodoFilterProps = {
  searchInput: string;
  setSearchInput: (input: string) => void ;
  setFilter: (filter: Filter) => void,
  filter: Filter;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  searchInput,
  setSearchInput,
  setFilter,
  filter,

}) => {
  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSearchInput(event.target.value);
  };

  const resetSearchInput = () => {
    setSearchInput('');
  };

  const handleFilterChoise: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            defaultValue="all"
            onChange={handleFilterChoise}
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
          value={searchInput}
          onChange={handleSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {(searchInput !== '') && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetSearchInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
