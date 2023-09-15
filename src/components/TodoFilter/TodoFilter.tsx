import React from 'react';
import { FilterType } from '../../services/variables';

type Props = {
  filterBy: string,
  setFilterBy: (option: string) => void,
  query: string,
  onSetQuery: (option: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  onSetQuery,
}) => {
  const isActive = query !== '';

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filterBy}
            data-cy="statusSelect"
            onChange={(event) => setFilterBy(event.target.value)}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
          onChange={(event) => onSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {isActive && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSetQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
