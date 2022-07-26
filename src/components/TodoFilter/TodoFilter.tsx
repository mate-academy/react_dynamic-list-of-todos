import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  onFilterSelect: (value: Filter) => void,
  searchQuery: string,
  onQueryChange: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterSelect,
  onQueryChange,
  searchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={({ target }) => onFilterSelect(target.value as Filter)}
        >
          <option value={Filter.All}>All</option>
          <option value={Filter.Active}>Active</option>
          <option value={Filter.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={searchQuery}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={({ target }) => onQueryChange(target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {Boolean(searchQuery) && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
