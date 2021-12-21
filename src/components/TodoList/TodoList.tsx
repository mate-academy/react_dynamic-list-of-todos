/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import { Todo } from '../../Types/Todo';

type Props = {
  todos: Todo[],
  onUserClick: (newUserId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, onUserClick }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(
          todo => (
            <li
              className="TodoList__item"
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  button
                "
                type="button"
                onClick={() => onUserClick(todo.userId)}
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  </div>
);
