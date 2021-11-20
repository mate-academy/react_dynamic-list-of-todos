/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../types/types';

interface Props {
  todos: Todo[];
  selectUser: (userId: number) => void;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, selectUser } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label>
                <input type="checkbox" checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': !todo.completed },
                )}
                type="button"
                onClick={() => selectUser(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
