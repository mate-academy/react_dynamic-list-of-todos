import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

interface Props {
  todos: Todo[];
  handleUserSelection: (selectedUserId: number) => void;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, handleUserSelection } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
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
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => handleUserSelection(todo.id)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
