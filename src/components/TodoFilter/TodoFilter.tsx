import React, { ChangeEvent } from 'react';
import { FilterType } from '../../types/FilterTypes';

type Props = {
  query: string;
  onQuery: (query: string) => void;
  selectedType: string;
  onSelectedType: (filter: FilterType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQuery,
  selectedType,
  onSelectedType,
}) => {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value);
  };

  const resetQuery = () => {
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedType}
            onChange={(event) => (
              onSelectedType(event.target.value as FilterType))}
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
