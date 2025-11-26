import React from 'react';

type Props = {
  status: 'all' | 'active' | 'completed';
  searchTerm: string;
  onStatusChange: (value: 'all' | 'active' | 'completed') => void;
  onSearch: (value: string) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  searchTerm,
  onStatusChange,
  onSearch,
  onClearSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as Props['status'])}
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
          onChange={e => onSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchTerm && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
