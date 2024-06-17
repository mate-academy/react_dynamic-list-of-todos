import React from 'react';
import { SortQuery } from '../../types/Sort';

type Props = {
  query: string;
  onQChange: (query: string) => void;
  onSelect: (query: SortQuery) => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQChange,
  onSelect,
  onClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelect(event.target.value as SortQuery)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => onQChange(event.target.value)}
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
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
