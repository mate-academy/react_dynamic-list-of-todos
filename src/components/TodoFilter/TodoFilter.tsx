import React from 'react';
import { Status } from '../../types/types';

type Props = {
  setStatusSelect: (item: string) => void;
  setQuery: (item: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setStatusSelect,
  setQuery,
  query,
}) => {
  const clearInput = () => {
    setQuery('');
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSelect(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusSelect}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              aria-label="Clear search input"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
