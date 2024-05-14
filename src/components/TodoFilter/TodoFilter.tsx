import React from 'react';
import { FilterTodoBy } from '../../App';

interface Props {
  onFilter: (value: FilterTodoBy) => void;
  onQueryChange: (value: string) => void;
  query: string;
}
export const TodoFilter: React.FC<Props> = ({
  onFilter,
  onQueryChange: onQueryChange,
  query,
}) => {
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const selectedFilter = event.target.value as FilterTodoBy;

    onFilter(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Complited</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => onQueryChange(event.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={() => onQueryChange('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
