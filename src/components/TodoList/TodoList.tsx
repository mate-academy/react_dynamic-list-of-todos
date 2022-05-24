import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  chooseUser: (id: number) => void;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  chooseUser,
  selectedUserId,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {todos.map(({
            userId,
            title,
            completed,
            id,
          }) => (
            <li
              key={id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
            >
              <label>
                <input type="checkbox" checked={completed} readOnly />
                <p>{title}</p>
              </label>
              {userId && (
                <button
                  className={classNames(
                    'TodoList__user-button', 'button',
                    {
                      'TodoList__user-button--selected': selectedUserId
                     === userId,
                    },
                  )}
                  type="button"
                  data-cy="userButton"
                  value={userId}
                  onClick={() => chooseUser(userId)}
                >
                  {`User #${userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
