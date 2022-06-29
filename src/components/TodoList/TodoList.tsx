import React, { useState } from 'react';
import cn from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  isSelected: (userId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, isSelected }) => {
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState('all');

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));

  switch (isFiltered) {
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
      break;

    case 'active':
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
      break;

    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Filter by title"
        data-cy="filterByTitle"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        value={isFiltered}
        onChange={(event) => setIsFiltered(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Not Completed</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
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
                type="button"
                className={cn(
                  'button',
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                    todo.id === selectedTodoId,
                  },
                )}
                data-cy="userButton"
                onClick={() => {
                  isSelected(todo.userId);
                  setSelectedTodoId(todo.id);
                }}
              >
                { `User #${todo.userId}` }
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
