import React from 'react';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  onSelect: (option: string) => void;
  onQuery: (query: string) => void;
  onClear: () => void;
  query: string,
};

export const TodoFilter: React.FC<Props> = (
  {
    onSelect,
    onQuery,
    onClear,
    query,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelect(event.target.value)}
        >
          <option value="all">All</option>
          <option value={FilterOptions.active}>Active</option>
          <option value={FilterOptions.completed}>Completed</option>
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
        onChange={event => onQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClear}
          />
        )}
      </span>
    </p>
  </form>
);
