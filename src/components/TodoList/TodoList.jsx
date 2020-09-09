import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, selectUser, updateCompleted, filterTodos, handleSelect }) => {
  return (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      placeholder="filter todos"
      onChange={event => filterTodos(event.target)}
    />
    <select
      onChange={event => handleSelect(event.target.value)}
    >
      <option>
        All
      </option>
      <option>
        Active
      </option>
      <option>
        Completed
      </option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li className="TodoList__item TodoList__item--unchecked" key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={event => updateCompleted(event.target)}
                value={todo.id}
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
              onClick={() => selectUser(todo)}
            >
              User&nbsp;#{todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)};
