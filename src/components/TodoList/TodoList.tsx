import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, selectUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item ',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor="status">
                <input type="checkbox" name="status" checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className={cn('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': !todo.completed,
                })}
                type="button"
                onClick={() => selectUser(todo.userId)}
              >
                {`User#${todo.userId}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
