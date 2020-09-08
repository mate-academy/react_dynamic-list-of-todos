import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, changeUser, changeInput, filterTodos, check }) => (
  <div className="TodoList">
    <input
      type="text"
      placeholder="Type search todo"
      onChange={(event) => {
        changeInput(event.target.value)
      }}
    />
    <select
      className="filters"
      onChange={filterTodos}
    >
      <option
        name="All"
      >
        All
      </option>
      <option
        name="Active"
      >
        Active
      </option>
      <option
        name="Completed"
      >
        Completed
      </option>
    </select>
    <h2>Todos:</h2>
    <ul className="TodoList__list">
      {todos.map(todo=>(
        <li className="TodoList__item">
          <p>ID : {todo.id}</p>
          <label>
            <input
              type="checkbox"
              className="toggle"
              onChange={check}
              id={todo.id}
              value={todo.id}
              checked={todo.completed}
            />
            {todo.title}
          </label>
          <button
            type="button"
            onClick={()=>{changeUser(todo.userId)}}
          >
            User&nbsp;#{todo.userId}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
