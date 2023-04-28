import React, { ChangeEvent } from 'react';
import { FilterType } from '../../types/FilterTypes';
import './TodoFilter.scss';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  selectedType: string;
  onSelectedType: (filter: FilterType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  selectedType,
  onSelectedType,
}) => {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const resetQuery = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            className="select-type"
            data-cy="statusSelect"
            value={selectedType}
            onChange={event => {
              const target = event.target.value;

              return (
                onSelectedType(target as FilterType)
              );
            }}
          >
            {Object.values(FilterType).map((filterType) => (
              <option key={filterType} value={filterType}>{filterType}</option>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="Mute volume"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}

      </p>
    </form>
  );
};
