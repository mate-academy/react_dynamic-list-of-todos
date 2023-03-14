import React from 'react';
import { FilteredBy } from '../../types/Filter';

type Props = {
  query: string,
  onChangeQuery: (query: string) => void,
  filterBy: FilteredBy,
  setFilterBy: (filterBy: FilteredBy) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  filterBy,
  setFilterBy,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilteredBy);
  };

  const handleClearSearch = () => {
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSelectChange}
          >
            <option value={FilteredBy.ALL}>
              All
            </option>

            <option value={FilteredBy.ACTIVE}>
              Active
            </option>

            <option value={FilteredBy.COMPLETED}>
              Completed
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
          onChange={handleInputChange}
        />
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
