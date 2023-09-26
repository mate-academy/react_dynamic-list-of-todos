import { useState } from 'react';
import { Filter } from '../../types/Filter';

type TodoFilterProps = {
  setFilter: (filter: Filter) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setFilter,
  setSearchTerm,
  searchTerm,
}) => {
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter: Filter = event.target.value as Filter;

    setFilter(selectedFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
    setIsSearchEmpty(newSearchTerm === '');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!isSearchEmpty && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
