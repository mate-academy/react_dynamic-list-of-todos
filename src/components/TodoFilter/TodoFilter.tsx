import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  onFilter: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFind, setTodoFind] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  });

  const findTodos = (todoTitle: string) => {
    setTodos(todos.filter(todo => todo.title.includes(todoTitle)));
  };

  function filterTodos(filterType: string) {
    switch (filterType) {
      case FilterType.ALL:
        return onFilter(todos.filter(todo => todo));

      case FilterType.ACTIVE:
        return onFilter(todos.filter(todo => todo.completed === false));

      case FilterType.COMPLETED:
        return onFilter(todos.filter(todo => todo.completed === true));

      default:
        return 0;
    }
  }

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              (event) => filterTodos(event.target.value)
            }
          >
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={todoFind}
          onChange={(event) => {
            setTodoFind(event.target.value);
            findTodos(event.target.value);
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
              setTodoFind('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
