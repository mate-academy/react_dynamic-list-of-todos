import React from 'react';
import { SelectStatusTodos } from '../../types/SelectStatusTodos';

interface TodoFilterProps {
  search: string;
  onChangeInput: (searchByTitle: string) => void;
  chooseStatus: (selectStatusTodos: SelectStatusTodos) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  search,
  onChangeInput,
  chooseStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              chooseStatus(event.target.value as SelectStatusTodos)
            }
          >
            <option value={SelectStatusTodos.All}>All</option>
            <option value={SelectStatusTodos.Active}>Active</option>
            <option value={SelectStatusTodos.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={event => onChangeInput(event.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
