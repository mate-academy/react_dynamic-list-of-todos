import React from 'react';
import { FilterType } from '../../App';

interface TodoFilterProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  setQuery,
  filter,
  setFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event => setFilter(event.target.value as FilterType)}
        >
          <option value={FilterType.All}>All</option>
          <option value={FilterType.Active}>Active</option>
          <option value={FilterType.Completed}>Completed</option>
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
        onChange={event => setQuery(event.target.value.trimStart())}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query.length !== 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
