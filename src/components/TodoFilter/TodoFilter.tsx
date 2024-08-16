import React, { useState } from 'react';
import { TodoFilterEnum } from '../../enums/TodoFilterEnum';

interface Props {
  onFilterChange: (filter: TodoFilterEnum) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onSearch,
  onClearSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as TodoFilterEnum);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    onClearSearch();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select" onChange={handleFilterChange}>
          <select data-cy="statusSelect">
            {Object.values(TodoFilterEnum).map(filter => (
              <option key={filter} value={filter}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
          onChange={handleSearchChange}
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
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
