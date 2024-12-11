import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  setTodos: (todos: Todo[]) => void;
  todos: Todo[] | undefined;
}

export const TodoFilter: React.FC<Props> = ({ setTodos, todos }) => {
  const [select, setSelect] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!todos) {
      return;
    }

    let filteredTodos = todos;

    if (select !== 'all') {
      filteredTodos = todos.filter(todo =>
        select === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (input) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(input.toLowerCase()),
      );
    }

    setTodos(filteredTodos);
  }, [input, select, todos, setTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={select}
            onChange={e => {
              setSelect(e.target.value);
            }}
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
          data-cy="searchInput"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInput('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
