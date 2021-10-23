import React from 'react';
import './TodoList.scss';
import className from 'classnames';

interface Props {
  todos: Todo[],
  onUser: (value:number) => void,
}

export const TodoList: React.FC<Props> = ({ todos, onUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => {
          const {
            id, title, userId, completed,
          } = todo;

          return (
            <li
              className={className('TodoList__item', `TodoList__item--${
                completed ? 'checked' : 'unchecked'
              }`)}
              key={id}
            >
              <label htmlFor={title}>
                <input type="checkbox" id={title} readOnly checked={completed} />
                <p>{title}</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
                onClick={() => {
                  onUser(userId);
                }}
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
