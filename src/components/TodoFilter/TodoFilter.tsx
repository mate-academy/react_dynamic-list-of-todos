import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  getVisibleTodos: (visibleTodos:Todo[]) => void,
  todos: Todo[];
};

export const TodoFilter:React.FC<Props> = ({ getVisibleTodos, todos }) => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('all');

  const filterByStatus = () => {
    if (status === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    if (status === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  };

  const filteringTodos = () => {
    return filterByStatus().filter(todo => todo.title
      .toLowerCase().includes(value.toLowerCase()));
  };

  useEffect(() => {
    getVisibleTodos(filterByStatus());
  }, [todos, status]);

  useEffect(() => {
    getVisibleTodos(filteringTodos());
  }, [todos, value]);

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setStatus(event.target.value)}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
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
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
