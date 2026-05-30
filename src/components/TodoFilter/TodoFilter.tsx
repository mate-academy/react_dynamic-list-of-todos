import React from 'react';
import classNames from 'classnames';

type Props = {
  query: string;
  status: 'all' | 'completed' | 'active';
  onQueryChange: (value: string) => void;
  onStatusChange: (value: 'all' | 'completed' | 'active') => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event =>
              onStatusChange(
                event.target.value as 'all' | 'completed' | 'active',
              )
            }
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
          onChange={event => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className={classNames('icon is-right')}
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
