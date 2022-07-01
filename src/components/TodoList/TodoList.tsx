import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
  userId: number;
  onSelectUser: (newSelectedUserId: number) => void;
}

export const TodoList: React.FC<TodoListProps> = (
  { todos, userId, onSelectUser },
) => {
  const [query, setQuery] = useState('');
  const queryResults = todos.filter(todo => todo.title.includes(query));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        value={query}
        type="text"
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            queryResults.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': userId === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
