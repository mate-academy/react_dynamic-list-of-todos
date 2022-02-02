import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUsersbyId: (id: number) => void;
  setCheckTodo: (id: number, isChecked: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUsersbyId,
  selectedUserId,
  setCheckTodo,
}) => (
  <div className="TodoList">

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {
          todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  onChange={() => (setCheckTodo(todo.id, todo.completed))}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': (todo.userId === selectedUserId) },
                )}
                type="button"
                onClick={() => (selectUsersbyId(todo.userId))}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);
