import React from 'react';
import { FilterSelect } from '../../types/FilterSelect';

type Props = {
  filterSelect: FilterSelect
  filterTitle: string
  onFilterSelectChange: (filterSelect: FilterSelect) => void
  onFilterTitleChange: (filterTitle: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  filterSelect,
  filterTitle,
  onFilterSelectChange,
  onFilterTitleChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterSelect}
          onChange={(event) => onFilterSelectChange(
            event.target.value as FilterSelect,
          )}
        >
          <option value={FilterSelect.All}>All</option>
          <option value={FilterSelect.Active}>Active</option>
          <option value={FilterSelect.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={filterTitle}
        onChange={(event) => onFilterTitleChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {filterTitle !== '' && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onFilterTitleChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
