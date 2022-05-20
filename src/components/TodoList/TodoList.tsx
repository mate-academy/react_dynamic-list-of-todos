import React, { useState } from 'react';
import './TodoList.scss';
import { ToDo } from '../../types/types'

type Props = {
  todos: ToDo[],
  selectedUserId: any,
  setSelectedUserId: any,
}

export const TodoList: React.FC<Props> = ({ todos, setSelectedUserId }) => {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState('');

  const isFiltered = () => {

    if (completed === 'Active') {
      return todos.filter(todo => (
        todo.title.toLowerCase().startsWith(query.toLowerCase()) && todo.completed === false
      ))
    }

    if (completed === 'Completed') {
      return todos.filter(todo => (
        todo.title.toLowerCase().startsWith(query.toLowerCase()) && todo.completed === true
      ))
    }

    return todos.filter(todo => (
      todo.title.toLowerCase().startsWith(query.toLowerCase())
    ))
  }

  const filterd = isFiltered();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <form action="">
          <input
            type="text"
            data-cy="filterByTitle"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
          />
          <select
            onChange={(event) => {
              setCompleted(event.target.value)
            }}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </form>
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {
            filterd.map(todo => (
              <li className={`TodoList__item TodoList__item--${todo.completed}`} key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    disabled
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  data-cy="userButton"
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  {`User#${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};
