import React from 'react';
import { FilterTodo } from '../../types/FilterTodo';

type Props = {
  selectedFilterTodo: FilterTodo;
  onChangeFilter: (action: FilterTodo) => void;
  currentQuery: string;
  onChangeQuery: (text: string) => void;
  resetQuery: () => void;
};

const TodoFilterComponent: React.FC<Props> = ({
  selectedFilterTodo,
  onChangeFilter,
  currentQuery,
  onChangeQuery,
  resetQuery,
}) => {
  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(event.target.value as FilterTodo);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleChangeFilter}
            value={selectedFilterTodo}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={currentQuery}
          onChange={handleChangeInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {currentQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export const TodoFilter = React.memo(TodoFilterComponent);
