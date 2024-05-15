import React from 'react';

import { Filter } from '../../types/Filter';

interface Props {
  filter: Filter;
  onFilter: (filterBy: Filter) => void;
  query: string;
  onQuery: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilter,
  query,
  onQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event => onFilter(event.target.value as Filter)}
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
        onChange={event => onQuery(event.target.value.trimStart())}
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
            onClick={() => onQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
