import React from 'react';
import { Filters } from '../../types/Filters';

const filters = ['All', 'Active', 'Completed'];

type Props = {
  handleFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  selectedFilter: Filters;
};

export const TodoFilter: React.FC<Props> = ({
  handleFilterChange,
  setQuery,
  query,
  selectedFilter,
}) => {
  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(event.target.value as Filters);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trimStart());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={onFilterChange}
          >
            {filters.map(filter => (
              <option value={filter.toLowerCase()} key={filter}>
                {filter}
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
          onChange={onInputChange}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
