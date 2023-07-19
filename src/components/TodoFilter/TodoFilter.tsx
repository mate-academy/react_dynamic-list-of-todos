import React from 'react';
import { FilterValues } from '../../types/FilterValues';

type Props = {
  filterByCompleted: FilterValues,
  onFilterByCompleted: (value: FilterValues) => void,
  filterByTitle: string,
  onFilterByTitle: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterByCompleted, onFilterByCompleted, filterByTitle, onFilterByTitle,
}) => {
  const handlerSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterByCompleted(event.target.value as FilterValues);
  };

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByTitle(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterByCompleted}
            onChange={handlerSelectChange}
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
          value={filterByTitle}
          onChange={handlerInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterByTitle.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onFilterByTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
