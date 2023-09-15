import React from 'react';
import { FilterKey } from '../../types/FilterKey';

type Props = {
  onFilterKeyChange: (key: FilterKey) => void,
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onQueryDelete: () => void
  query: string,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  onFilterKeyChange, onQueryChange, query, onQueryDelete,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={
            (event) => onFilterKeyChange(event.target.value as FilterKey)
          }
        >
          <option value={FilterKey.All}>All</option>
          <option value={FilterKey.Active}>Active</option>
          <option value={FilterKey.Completed}>Completed</option>
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
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {!!query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onQueryDelete}
          />
        </span>
      )}
    </p>
  </form>
));
