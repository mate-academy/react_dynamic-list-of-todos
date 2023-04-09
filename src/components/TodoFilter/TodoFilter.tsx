import React from 'react';

type Props = {
  status: string;
  handleChange: (value: string) => void;
  query: string;
  setQuery: (arg: string) => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    status,
    handleChange,
    query,
    setQuery,
  },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={(event) => handleChange(event.target.value)}
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="Mute volume"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
