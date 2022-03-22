/* eslint-disable no-console */
import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  todos: Todo[]
  selectUserId: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUserId,
}) => {
  const [actualTodos, setActualTodos] = useState(todos);
  const [input, setInput] = useState('');

  function filter(value: string) {
    switch (value) {
      case 'all':
        setActualTodos(todos);
        break;
      case 'active':
        setActualTodos(todos.filter(todo => todo.completed === false));
        break;
      case 'completed':
        setActualTodos(todos.filter(todo => todo.completed === true));
        break;
      default:
        setActualTodos(actualTodos.filter(todo => todo.title.includes(value)));
        break;
    }
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <select
        className="TodoList__inputs"
        id="filter"
        onChange={
          (event) => {
            filter(event.target.value);
            setInput('');
            event.preventDefault();
          }
        }
      >
        <option value="0" selected disabled>Please choose users</option>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
      <span className="TodoList__inputs">Please Enter</span>
      <input
        className="TodoList__inputs"
        type="text"
        value={input}
        onChange={
          (event) => {
            setInput(event.target.value);
            filter(event.target.value);
          }
        }
      />
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {actualTodos.map(todo => (
            <>
              <li
                key={todo.id}
                className={cn({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{ todo.title }</p>
                </label>

                <button
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                  type="button"
                  onClick={() => {
                    selectUserId(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
