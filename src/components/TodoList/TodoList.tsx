import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onUserSelect: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase()
      .includes(query.toLowerCase())
  ));

  switch (filterBy) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        onChange={event => {
          setFilterBy(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
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
                onClick={() => onUserSelect(todo.userId)}
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
};
