import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUser: (id: number) => void,
  selectedUserId: number
};

export const TodoList: React.FC<Props> = ({ todos, selectedUser, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classnames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor={`${todo.id}`}>
              <input
                checked={todo.completed}
                id={`${todo.id}`}
                type="checkbox"
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classnames(
                'TodoList__user-button',
                { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                'button',
              )}
              type="button"
              onClick={() => selectedUser(todo.userId)}
            >
              User&nbsp;
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
