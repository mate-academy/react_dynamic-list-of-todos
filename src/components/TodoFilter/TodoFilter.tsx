/* eslint-disable max-len */
import React from 'react';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onQueryClear: () => void;
  select: 'all' | 'active' | 'completed';
  onSelectChange: (value: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onQueryClear,
  select,
  onSelectChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={select}
          onChange={event =>
            onSelectChange(event.target.value as 'all' | 'active' | 'completed')
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
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onQueryClear}
          />
        </span>
      )}
    </p>
  </form>
);
