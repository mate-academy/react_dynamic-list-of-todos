/* eslint-disable max-len */
import React from 'react';
import { FilterType } from '../../types/FilterTypes';

type Props = {
  query: string,
  filterType: FilterType,
  onClear: () => void,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeFilterType: (type: FilterType) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterType,
  onClear,
  onChange,
  onChangeFilterType,
}) => {
  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilterType(event.target.value as FilterType);
  };

  const handleClearButtonClick = () => {
    onClear();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={onChange}
          value={query}
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
              onClick={handleClearButtonClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
