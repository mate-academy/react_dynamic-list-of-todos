import React from 'react';
import { FilterBy } from '../utiles/FilterBy';

interface Props {
  qerty: string;
  setQerty: (qerty: string) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
}

export const TodoFilter: React.FC<Props> = ({
  qerty,
  setQerty,
  filterBy,
  setFilterBy,
}) => {
  const handleImputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQerty(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleFilter}
          >
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          name='searchInput'
          value={qerty}
          onChange={handleImputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>


       <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {qerty && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          aria-label='clear'
          onClick={() => setQerty('')}
        />)}
       </span>
      </p>
    </form>
  );
}
