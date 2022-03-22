import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectUserId: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUserId,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <>
              <li
                key={todo.id}
                className={cn({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{ todo.title }</p>
                </label>

                <button
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                  type="button"
                  onClick={() => {
                    selectUserId(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
