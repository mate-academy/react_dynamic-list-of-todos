import React from 'react';

import { capitalize } from '../../helpers/capitalize';
import { TodoStatus } from '../../types/TodoStatus';
import { FilterBy } from '../../types/FilterBy';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterBy,
  setFilterBy,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  const handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClickClear = () => {
    setQuery('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleFormOnSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSelectChange}
          >
            {Object.values(TodoStatus).map((todoStatus) => (
              <option key={todoStatus} value={todoStatus}>
                {capitalize(todoStatus)}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          name="searchInput"
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear"
              onClick={handleClickClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
