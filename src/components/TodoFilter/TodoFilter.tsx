/* eslint-disable import/no-cycle */
import React, { ChangeEvent } from 'react';
import { FilterBy } from '../../App';

interface Props {
  setFilterTodoBy: React.Dispatch<React.SetStateAction<FilterBy>>,
  filterTodoBy: FilterBy,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  searchQuery: string,
}

export const TodoFilter: React.FC<Props> = ({
  setFilterTodoBy, filterTodoBy, setSearchQuery, searchQuery,
}) => {
  const handleColorChange
  = (event: ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;

    switch (filterType) {
      case FilterBy.ACTIVE:
        setFilterTodoBy(FilterBy.ACTIVE);
        break;

      case FilterBy.COMPLETED:
        setFilterTodoBy(FilterBy.COMPLETED);
        break;

      default:
        setFilterTodoBy(FilterBy.ALL);
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterTodoBy}
            onChange={handleColorChange}
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
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
            setFilterTodoBy(FilterBy.QUERY);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
