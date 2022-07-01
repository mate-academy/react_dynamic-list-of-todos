import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  query: string,
  done: string,
  selectUser: (userId: number) => void,
}

export const TodoList: React.FC<Props> = (
  {
    todos,
    selectUser,
    query,
    done,
  },
) => {
  const visibaleTodos = todos.filter(todo => {
    const lowerQuery = query.toLowerCase();
    const includesQyery = todo.title.toLowerCase().includes(lowerQuery);

    switch (done) {
      case 'active':
        return includesQyery && !todo.completed;
      case 'completed':
        return includesQyery && todo.completed;
      default:
        return includesQyery;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibaleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': todo.completed === false,
                  'TodoList__item--checked': todo.completed === true,
                },
              )}
            >
              {' '}

              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};
