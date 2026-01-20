import React from 'react';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  onChangeFilter: (option: FilterOptions) => void;
  onChangeQuery: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onChangeFilter,
  onChangeQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event =>
            onChangeFilter(event.target.value as FilterOptions)
          }
        >
          <option value={FilterOptions.All}>All</option>
          <option value={FilterOptions.Active}>Active</option>
          <option value={FilterOptions.Completed}>Completed</option>
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
        onChange={event => onChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query.length && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
