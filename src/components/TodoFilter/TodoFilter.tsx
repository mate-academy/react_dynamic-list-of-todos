import React from 'react';
import { FilterField } from '../../types/FilterField';

interface Props {
  filterField: FilterField;
  onFieldChange: (field: FilterField) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterField,
  onFieldChange,
  query,
  onQueryChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterField}
            onChange={e => onFieldChange(e.target.value as FilterField)}
          >
            <option value={FilterField.All}>All</option>
            <option value={FilterField.Active}>Active</option>
            <option value={FilterField.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          className="input"
          placeholder="Search..."
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
              onClick={() => onQueryChange('')}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
