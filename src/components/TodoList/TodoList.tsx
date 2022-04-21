import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  userId: number;
  selectUser: (x: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    userId,
    selectUser,
  }) => {
    return (
      <div className="TodoList">
        <div className="TodoList__list-container">
          <h2>Todos:</h2>
          {todos.length > 0 ? (
            <ul className="TodoList__list">
              {todos.map(todo => (
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
                      readOnly
                      checked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames(
                      'button',
                      'TodoList__user-button',
                      {
                        'TodoList__user-button--selected':
                        todo.userId === userId,
                      },
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="TodoList__warn-message">
              No todo with the specified title!
            </p>
          )}
        </div>
      </div>
    );
  },
);
