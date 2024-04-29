import React, { FC } from 'react';
import { Filters } from '../../App';

interface Props {
  query: string;
  onQueryChange: (input: string) => void;
  onFilterChange: (type: Filters) => void;
}

export const TodoFilter: FC<Props> = ({
  query,
  onQueryChange,
  onFilterChange,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Filters;

    onFilterChange(selectedFilter);
  };

  const handleInputChange: React.ChangeEventHandler<
  HTMLInputElement
  > = event => {
    onQueryChange(event.target.value);
  };

  const handleResetInput = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
            title="Filter by status"
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
