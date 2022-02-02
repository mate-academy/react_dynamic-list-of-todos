/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void;
  selectedUserId: number,
  query: string,
  randomaizer: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos, selectedUserId, selectUser, query, randomaizer,
}) => (
  <div className="TodoList">
    <button
      type="button"
      className="button TodoList__user-button--selected"
      onClick={randomaizer}
    >
      Randomizer
    </button>
    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => {
          if (todo.title.toLocaleLowerCase().includes(query)) {
            return (
              (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item ',
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
                    <p>
                      {todo.title}
                      {query}
                    </p>
                  </label>
                  <button
                    className={classNames(
                      'button',
                      'TodoList__user-button',
                      {
                        'TodoList__user-button--selected': todo.userId === selectedUserId
                          || selectedUserId === 0,
                      },
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              )
            );
          }

          return null;
        })}
      </ul>
    </div>
  </div>
);
