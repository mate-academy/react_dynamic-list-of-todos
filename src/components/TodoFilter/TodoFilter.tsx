import React from 'react';
import { Props, ShowType } from './TodoFilter.types';

export const TodoFilter: React.FC<Props> = ({
  query,
  filterBy,
  onSelectChange,
  onInputChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={({ target: { value } }) => {
              onSelectChange(value as ShowType);
            }}
          >
            {Object.entries(ShowType).map(([key, value]) => (
              <option
                value={value}
                selected={filterBy === key}
              >
                {key}
              </option>
            ))}
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
          onChange={({ target: { value } }) => {
            onInputChange(value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="Reset"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInputChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
