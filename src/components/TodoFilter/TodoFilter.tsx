import React, { ChangeEvent } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterBy: FilterType;
  setFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  setQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  cleaner: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilter,
  query,
  setQuery,
  cleaner,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={filterBy} onChange={setFilter}>
            <option value={FilterType.all}>All</option>
            <option value={FilterType.active}>Active</option>
            <option value={FilterType.completed}>Completed</option>
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
          onChange={setQuery}
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
              onClick={cleaner}
            />
          </span>
        )}
      </p>
    </form>
  );
};
