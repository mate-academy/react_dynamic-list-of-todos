import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  chooseUser: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  chooseUser,
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
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <button
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                type="button"
                data-cy="userButton"
                value={userId}
                onClick={() => chooseUser(userId)}
              >
                {`User #${userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
