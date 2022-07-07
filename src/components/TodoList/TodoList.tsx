import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedUserId: number;
  onSelectHandler: (userId: number) => void;
}

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onSelectHandler,
    selectedUserId,
  }) => {
    const [title, setTitle] = useState('');
    const [filterByStatus, setFilterByStatus] = useState('all');

    let filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(title.toLowerCase())
    ));

    if (filterByStatus !== 'all') {
      filteredTodos = filterByStatus === 'completed'
        ? filteredTodos.filter(todo => todo.completed)
        : filteredTodos.filter(todo => !todo.completed);
    }

    return (
      <div className="TodoList">
        <h2 className="title">Todos</h2>

        <input
          type="text"
          data-cy="filterByTitle"
          placeholder="search by title"
          value={title}
          onChange={(event) => (
            setTitle(event.target.value)
          )}
        />

        <select
          value={filterByStatus}
          onChange={(event) => (
            setFilterByStatus(event.target.value)
          )}
        >
          <option value="all">All</option>
          <option value="active">Not Completed</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
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
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={cn(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                      selectedUserId === todo.userId,
                    },
                  )}
                  data-cy="userButton"
                  onClick={() => onSelectHandler(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
