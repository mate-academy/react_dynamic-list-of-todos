import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
};

export const TodoFilter: React.FC<Props> = ({ setTodos }) => {
  const [qwerty, setQwerty] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getTodos().then(serverTodos => {
      let currentTodos: Todo[] | null = serverTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(qwerty.toLocaleLowerCase()),
      );

      switch (status) {
        case 'active':
          currentTodos = currentTodos.filter(todo => !todo.completed);
          break;
        case 'completed':
          currentTodos = currentTodos.filter(todo => todo.completed);
          break;
      }

      setTodos(currentTodos);
    });
  }, [qwerty, status]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setStatus(e.target.value)}
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
          value={qwerty}
          onChange={e => {
            setQwerty(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {qwerty && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQwerty('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
