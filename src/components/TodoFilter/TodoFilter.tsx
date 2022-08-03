import React from 'react';

type Props = {
  status: string,
  setStatus: (status: string) => void,
  searchTerm: string,
  setSearchTerm: (search: string) => void,
};

export const TodoFilter: React.FC<Props> = (
  {
    status, setStatus, searchTerm, setSearchTerm,
  },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
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
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchTerm
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                aria-label="Clear"
                className="delete"
                onClick={() => {
                  setStatus('All');
                  setSearchTerm('');
                }}
              />
            )}
        </span>
      </p>
    </form>
  );
};
