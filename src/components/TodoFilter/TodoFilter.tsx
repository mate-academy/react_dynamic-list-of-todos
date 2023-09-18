import React from 'react';
import { Todo } from '../../types/Todo';
import { SortTodos } from '../../types/SortTodos';

type Props = {
  selectFilter: number,
  setSelectFilter: (event: number) => void
  filteredTodos: (value: number) => Todo[];
  setFilterField: (e: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setSelectFilter,
  selectFilter,
  filteredTodos,
  setFilterField,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectFilter}
            data-cy="statusSelect"
            onChange={(e) => {
              filteredTodos(+e.target.value);
              setSelectFilter(+e.target.value);
            }}
          >
            <option value={SortTodos.All}>All</option>
            <option value={SortTodos.Active}>Active</option>
            <option value={SortTodos.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={(event) => setFilterField(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
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
          />
        </span>
      </p>
    </form>
  );
};
