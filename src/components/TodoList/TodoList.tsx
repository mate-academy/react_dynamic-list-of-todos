import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  onSelectHandler: (userId: number) => void;
}

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onSelectHandler,
  }) => {
    const [title, setTitle] = useState('');
    const [filterByStaus, setFilterByStatus] = useState('all');

    let filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(title.toLowerCase())
    ));

    if (filterByStaus !== 'all') {
      filteredTodos = filterByStaus === 'completed'
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
          value={filterByStaus}
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
                {todo.completed
                  ? (
                    <label>
                      <input type="checkbox" checked />
                      <p>{todo.title}</p>
                    </label>
                  )
                  : (
                    <label>
                      <input type="checkbox" />
                      <p>{todo.title}</p>
                    </label>
                  )}

                <button
                  type="button"
                  className="
                    TodoList__user-button
                    button
                  "
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
