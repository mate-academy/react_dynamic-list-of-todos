import React from 'react';
import { Status } from '../../Enum/Status';

type Props = {
  filter: Status,
  setFilter: (filter: Status) => void,
  query: string,
  setQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter, setFilter, query, setQuery,
}) => {
  const renderSearchIcon = () => (
    <div className="control">
      <button
        className="button is-static"
        type="button"
      >
        <span className="icon">
          <i className="fas fa-magnifying-glass" />
        </span>
      </button>
    </div>
  );

  const renderClearButton = () => (
    <div className="control">
      <button
        data-cy="clearSearchButton"
        type="button"
        className="delete"
        onClick={() => setQuery('')}
        aria-label="Clear search"
      />
    </div>
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event => setFilter(event.target.value as Status)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <div className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        {renderSearchIcon()}
        {query && renderClearButton()}
      </div>
    </form>
  );
};
