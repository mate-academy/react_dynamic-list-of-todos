import React from 'react';

type Props = {
  query: string;
  onQuaryChange: (value: string) => void;
  status: 'all' | 'active' | 'completed';
  onStatusChange: (value: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQuaryChange,
  status,
  onStatusChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={element =>
              onStatusChange(
                element.target.value as 'all' | 'active' | 'completed',
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
          onChange={element => onQuaryChange(element.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuaryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
