import React from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  filter: FilterBy;
  onFilterBy: (filter: FilterBy) => void;
  query: string;
  onQuery: (str: string) => void;
};

export const TodoFilter:React.FC<Props> = ({
  filter,
  onFilterBy,
  query,
  onQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onFilterBy(event.target.value as FilterBy)}
            value={filter}
          >
            <option
              value={FilterBy.ALL}
            >
              All
            </option>
            <option
              value={FilterBy.ACTIVE}
            >
              Active
            </option>
            <option
              value={FilterBy.COMPLETED}
            >
              Completed
            </option>
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

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              aria-label="clear"
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
};
