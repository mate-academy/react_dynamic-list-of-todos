import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

interface Props {
  todos: Todo[]
  onUserIdSelected: (userId: number) => void,
  selectedUserId: number,
}

export const TodoList: React.FC<Props> = ({
  todos,
  onUserIdSelected,
  selectedUserId,
}) => {
  const [title, setTitle] = useState<string>('');
  const [statusTodos, setStatusTodos] = useState<string>('all');

  const filteredTodosByTitle = (
    todos.filter(todo => todo.title.includes(title))
  );

  const filteredTodosByStatus = (allTodos: Todo[]) => {
    switch (statusTodos) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <p>Filter todos</p>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <p>Show todos</p>
        <select
          onChange={(event) => {
            setStatusTodos(event.target.value);
          }}
        >
          <option
            value="all"
          >
            Show all
          </option>

          <option
            value="active"
          >
            Show active
          </option>

          <option
            value="completed"
          >
            Show completed
          </option>
        </select>
        <ul className="TodoList__list">
          {filteredTodosByStatus(filteredTodosByTitle).map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                ' TodoList__item--checked': todo.completed,
                ' TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                type="button"
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': (
                    selectedUserId === todo.userId
                  ),
                })}
                onClick={() => {
                  onUserIdSelected(todo.userId);
                }}
              >
                {`User # ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
