import React from 'react';
import classNames from 'classnames';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p
        className={classNames('control', 'is-expanded', 'has-icons-left', {
          'has-icons-right': Boolean(search),
        })}
      >
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};