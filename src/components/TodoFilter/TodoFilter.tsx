import React from 'react';
import { FilterOption } from '../../types/FilterOption';

interface Props {
  filterOption: string;
  query: string;
  onSelectOption: (filterOption: FilterOption) => void;
  onChange: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  query,
  onSelectOption,
  onChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOption}
            onChange={
              (event) => onSelectOption(event.target.value as FilterOption)
            }
          >
            <option value={FilterOption.All}>
              {FilterOption.All}
            </option>
            <option value={FilterOption.Active}>
              {FilterOption.Active}
            </option>
            <option value={FilterOption.Completed}>
              {FilterOption.Completed}
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
          onChange={(event) => onChange(event.target.value)}
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
              onClick={() => onChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
