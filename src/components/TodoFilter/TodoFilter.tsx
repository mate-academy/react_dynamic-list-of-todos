import React, { useState } from 'react';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api';
import { Todo, TodoStatus } from '../../types/Todo';

type Props = {
  changeQuery: (value: string) => void,
  handleChangeTodos: (value: Promise<Todo[]>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  changeQuery,
  handleChangeTodos,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const changeSearchValue = (value: string) => {
    changeQuery(value);
    setSearchValue(value);
  };

  const onSortTodos = (event: React.FormEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case TodoStatus.Active:
        return handleChangeTodos(getActiveTodos());
      case TodoStatus.Completed:
        return handleChangeTodos(getCompletedTodos());
      default:
        return handleChangeTodos(getTodos());
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={onSortTodos}
          >
            <option value={TodoStatus.All}>{TodoStatus.All}</option>
            <option value={TodoStatus.Active}>{TodoStatus.Active}</option>
            <option value={TodoStatus.Completed}>{TodoStatus.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => changeSearchValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="delete"
              className="delete"
              onClick={() => changeSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
