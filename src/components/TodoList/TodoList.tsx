import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  handleUserSelection: (userId: number) => void;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, handleUserSelection } = props;

  // TodoList__item TodoList__item--unchecked

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
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
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  handleUserSelection(todo.userId);
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
