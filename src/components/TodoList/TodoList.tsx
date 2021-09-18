import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todosUsers: Todo[];
  selectedUserId: (userId: number) => void;
  currentUserId: number;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todosUsers,
    currentUserId,
    selectedUserId,
  } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todosUsers.map(todoUser => {
            const {
              id, userId, title, completed,
            } = todoUser;

            return (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': !!completed,
                  'TodoList__item--unchecked': !!completed === false,
                })}
                key={id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': currentUserId === userId,
                      'TodoList__user-button--unselected': currentUserId !== userId,
                    },
                  )}
                  type="button"
                  onClick={() => selectedUserId(userId)}
                >
                  {`User#${userId}`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

  );
};
