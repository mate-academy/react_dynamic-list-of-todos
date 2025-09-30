import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

type Props = {
  filterType: FilterType;
  onFilterChange: React.Dispatch<React.SetStateAction<FilterType>>;
  searchTerm: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={e => onFilterChange(e.target.value as FilterType)}
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
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchTerm.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
