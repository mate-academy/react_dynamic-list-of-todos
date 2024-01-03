import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  setFilter: (value: Filter) => void,
  filter: Filter,
  search: string
  setSearch: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filter,
  search,
  setSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            <option value={Filter.all}>All</option>
            <option value={Filter.active}>Active</option>
            <option value={Filter.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
