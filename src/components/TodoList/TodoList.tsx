import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (userId: number) => void,
  changeTodoStatus: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  changeTodoStatus,
}) => (
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
            <label htmlFor={`${todo.id}`}>
              <input
                type="checkbox"
                id={`${todo.id}`}
                checked={todo.completed}
                onChange={() => changeTodoStatus(+todo.id)}
              />

              <p>{todo.title}</p>
            </label>

            <button
              className="button
              TodoList__user-button--selected"
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
