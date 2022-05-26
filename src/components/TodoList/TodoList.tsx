import React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  selectUser: ((id: number) => void),
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li className="TodoList__item TodoList__item--unchecked">
            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>
            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              User&nbsp;
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
