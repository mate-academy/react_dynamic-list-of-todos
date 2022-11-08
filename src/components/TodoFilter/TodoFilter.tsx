import React from 'react';
import { FilterSelector } from '../../types/FilterSelector';

type Props = {
  filterSelection: string;
  setFilterSelection: React.Dispatch<React.SetStateAction<FilterSelector>>
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterSelection,
  setFilterSelection,
  query,
  setQuery,
}) => {
  const handleFilterSelection
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case FilterSelector.Active:
          setFilterSelection(FilterSelector.Active);
          break;

        case FilterSelector.Completed:
          setFilterSelection(FilterSelector.Completed);
          break;

        default:
          setFilterSelection(FilterSelector.All);
      }
    };

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterSelection}
            onChange={handleFilterSelection}
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
          onChange={handleQueryInput}
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
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
