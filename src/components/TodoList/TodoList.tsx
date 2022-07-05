import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  onSelect: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
}) => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(title.toLowerCase())
  ));

  switch (filter) {
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
        placeholder="Filter by title"
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
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={cn('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
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
                onClick={() => {
                  onSelect(todo.userId);
                }}
                className={cn(
                  'TodoList__user-button',
                  'button',
                )}
                type="button"
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
