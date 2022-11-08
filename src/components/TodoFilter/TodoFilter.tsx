import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setVisibleTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
  todoListFromServer: Todo[]
};

export const TodoFilter: React.FC<Props> = ({
  setVisibleTodoList,
  todoListFromServer,
}) => {
  const [search, setSearch] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');

  useEffect(() => {
    switch (selectFilter) {
      case 'all':
        setVisibleTodoList(todoListFromServer
          .filter(todo => todo.title.includes(search)));
        break;

      case 'active':
        setVisibleTodoList(todoListFromServer
          .filter(todo => todo.completed === false
            && todo.title.includes(search)));
        break;

      case 'completed':
        setVisibleTodoList(todoListFromServer
          .filter(todo => todo.completed !== false
            && todo.title.includes(search)));
        break;

      default:
        break;
    }
  }, [search, selectFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              setSelectFilter(e.target.value);
            }}
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
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
            onClick={() => {
              setSearch('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
