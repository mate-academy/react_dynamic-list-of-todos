import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  onSelectUserId: (userId: number) => void,
  query: string,
  setQuery: (value: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectUserId,
  query,
  setQuery,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <label>
          Filter:
          {' '}
          <input
            type="text"
            value={query}
            onChange={(event => setQuery(event.currentTarget.value))}
          />
        </label>

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
