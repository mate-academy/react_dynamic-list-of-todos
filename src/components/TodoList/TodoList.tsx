import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  selectedUserId: number;
  selectedUserChangeHandler: (setSelectedUserId: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectedUserChangeHandler,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
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
                  'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                },
              )}
              type="button"
              onClick={() => selectedUserChangeHandler(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
