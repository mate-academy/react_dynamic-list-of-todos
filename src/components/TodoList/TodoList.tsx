import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos:Todo[],
  callb:(event:React.MouseEvent<HTMLButtonElement>)=>void
}
export const TodoList: React.FC<Props> = ({ todos, callb }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => (
          <li className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <p>{todo.title}</p>
            <button
              className="TodoList__user-button button"
              type="button"
              name={`${todo.userId}`}
              onClick={callb}
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
