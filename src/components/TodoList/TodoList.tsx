import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  handleChange: (userId: number) => void;
  userId: number;
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos, handleChange, userId } = props;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
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
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': todo.userId === userId,
                })}
                type="button"
                onClick={() => {
                  handleChange(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
