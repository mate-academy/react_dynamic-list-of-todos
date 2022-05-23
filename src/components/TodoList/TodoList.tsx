import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  onSelectUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectUserId,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={classnames({
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
                <p>{todo.title}</p>
              </label>

              <button
                className="
                TodoList__user-button
                button
              "
                type="button"
                onClick={() => onSelectUserId(todo.userId)}
              >
                User&nbsp;#
                {' '}
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
