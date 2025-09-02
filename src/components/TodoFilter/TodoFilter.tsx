import React from 'react';

type Props = {
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  status: string;
};

export const TodoFilter: React.FC<Props> = ({
  handleQueryChange,
  query,
  setQuery,
  handleStatusChange,
  status,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleStatusChange}
            data-cy="statusSelect"
            value={status}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.trim().length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
              aria-label="Clear"
            />
          )}
        </span>
      </p>
    </form>
  );
};
