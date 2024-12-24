import React from 'react';

type Props = {
  status: string;
  query: string;
  onStatusChange: (value: string) => void;
  onQueryChange : (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange ,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value)}
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
          onChange={e => onQueryChange(e.target.value)}
        />
        {query.length !== 0 ? (
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>
        ) : null}

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length !== 0 ? (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          ) : null}
        </span>
      </p>
    </form>
  );
};
