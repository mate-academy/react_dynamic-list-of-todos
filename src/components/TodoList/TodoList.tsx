import React, { useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,

}) => {
  const [query, setQuery] = useState('');
  const [selectedTodos, setSelectedTodos] = useState('');

  const getVisibleTodos = () => {
    switch (selectedTodos) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  const filtredTodos = visibleTodos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__controlPanel controlPanel">
        <label>
          <input
            className="controlPanel__field"
            type="text"
            placeholder="Enter filter text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </label>

        <select
          className="controlPanel__field"
          value={selectedTodos}
          onChange={(event) => setSelectedTodos(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filtredTodos.map(todo => (
            <li
              className={`TodoList__item
                ${todo.completed
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'
            }`}
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              {todo.userId && (
                <button
                  className={`TodoList__user-button button
                    ${todo.completed && 'TodoList__user-button--selected'}
                  `}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
