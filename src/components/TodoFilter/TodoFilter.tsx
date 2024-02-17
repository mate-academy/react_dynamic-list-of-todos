import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string,
  setSearchQuery: (searchQuery: string) => void,
  setFilter: (status: Status) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setSearchQuery,
  setFilter,
}) => {
  const handleSetFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case Status.Completed:
        setFilter(Status.Completed);
        break;

      case Status.Active:
        setFilter(Status.Active);
        break;

      default:
        setFilter(Status.All);
        break;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteQuery = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSetFilter}
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
          value={query}
          onChange={handleSearch}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
              aria-label="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
