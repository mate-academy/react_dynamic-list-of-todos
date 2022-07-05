import React, { useState } from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onSelect: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
}) => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('All');

  let filterTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(title.toLowerCase())
  ));

  switch (filter) {
    case 'active':
      filterTodos = filterTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filterTodos = filterTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Title..."
        data-cy="filterByTitle"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Not Completed</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
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
                data-cy="userButton"
                onClick={() => onSelect(todo.userId)}
              >
                <span>{`User #${todo.userId}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
