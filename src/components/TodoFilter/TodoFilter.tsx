import React from 'react';

import {
  ProgressStatusOption,
  progressStatusOptions,
} from '../../types/ProgessStatusOptions';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  filterValue: ProgressStatusOption;
  onFilterValueChange: (value: ProgressStatusOption) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  filterValue,
  onFilterValueChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          name="status-select"
          value={filterValue}
          onChange={e =>
            onFilterValueChange(e.target.value as ProgressStatusOption)
          }
        >
          {progressStatusOptions.map(option => {
            return (
              <option value={option} key={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            );
          })}
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
        onChange={event => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
