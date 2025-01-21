import { FILTER_STATUS } from '../../utils/FILTER_STATUS';
import React from 'react';

type Props = {
  onFilterBy: (filterBy: string) => void;
  filterBy: string;
  onQuery: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterBy,
  onQuery,
  query,
  filterBy,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={event => onFilterBy(event.target.value)}
          >
            <option value={FILTER_STATUS.ALL}>All</option>
            <option value={FILTER_STATUS.ACTIVE}>Active</option>
            <option value={FILTER_STATUS.COMPLETED}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
