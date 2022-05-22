import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  selectUser: (userId: number, id: number) => void;
  displayedTodos: Todo[];
  currentTodoId: number,
};

export const TodoList: React.FC<Props>
  = ({
    selectUser,
    displayedTodos,
    currentTodoId,
  }) => (
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {displayedTodos.map(todo => (
          <li
            className={classNames({
              TodoList__item: true,
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p
                className={
                  (todo.id === currentTodoId) ? 'Selected' : ''
                }
              >
                {todo.title}
              </p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => {
                selectUser(todo.userId, todo.id);
              }}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
