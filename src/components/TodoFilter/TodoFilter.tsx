import React from 'react';
import { IQuery } from '../../types/Filter';

interface ITodoFilter {
  query: IQuery;
  setQuery: (query: IQuery) => void;
}

export enum SortField {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<ITodoFilter> = ({ query, setQuery }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as SortField;
    setQuery({ ...query, status });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery({ ...query, query: newQuery });
  };

  const handleDeleteButton = () => {
    setQuery({ status: SortField.All, query: '' });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={query.status}
            onChange={handleSelect}
            data-cy="statusSelect"
          >
            <option value={SortField.All}>All</option>
            <option value={SortField.Active}>Active</option>
            <option value={SortField.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query.query}
          onChange={handleInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
