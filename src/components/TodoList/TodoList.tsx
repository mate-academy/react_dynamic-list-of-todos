import React from 'react';
import './TodoList.scss';

interface Props {
  todo: Todo[],
  showUser: (id:number) => void,
  selectedUserId:number | null;
}

export const TodoList: React.FC<Props> = ({ todo, showUser, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todo.map(({
          id, title, completed, userId,
        }) => (
          <li
            key={id}
            className={`TodoList__item 
            ${completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}
            `}
          >
            <label htmlFor="qwe">
              <input type="checkbox" checked={completed} readOnly />
              <p>{title}</p>
            </label>

            <button
              onClick={() => {
                showUser(userId);
              }}
              className={`
                TodoList__user-button
                ${selectedUserId === userId ? 'TodoList__user-button--selected' : ''}
                button
              `}
              type="button"
            >
              User&nbsp;
              {userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
