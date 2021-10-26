import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos:Todo[],
  callb:(event:React.MouseEvent<HTMLButtonElement>)=>void,
  handler: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
  input:string,
  todoStatus:string,
}
export const TodoList: React.FC<Props> = ({ todos, callb, handler, input, todoStatus }) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="filter">
            <input
              type="text"
              className="input"
              name="input"
              value={input}
              placeholder="Type your todo here"
              onChange={handler}
            />
            <select
              className="select"
              name="todoStatus"
              value={todoStatus}
              onChange={handler}
            >
              <option value="All">all</option>
              <option value="completed">completed</option>
              <option value="uncompleted">uncompleted</option>
            </select>
          </div>
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
