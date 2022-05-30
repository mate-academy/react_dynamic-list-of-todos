import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[],
  setSelectedUserId: (id: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props>
= ({ todos, setSelectedUserId, selectedUserId }) => {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState('');

  const isFiltered = () => {
    switch (completed) {
      case 'Active':
        return todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
          && todo.completed === false
        ));
        break;

      case 'Completed':
        return todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
          && todo.completed === true
        ));
        break;

      default:
        break;
    }

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  };

  const filtered = isFiltered();

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
              setQuery(event.target.value);
            }}
          />
          <select
            onChange={(event) => {
              setCompleted(event.target.value);
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
            filtered.map(todo => (
              <li className={`TodoList__item TodoList__item--${todo.completed}`} key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    disabled
                  />
                  <p>{todo.title}</p>
                </label>

                {todo.userId
                  && (
                    <button
                      data-cy="userButton"
                      className={cn(
                        'TodoList__user-button', 'button',
                        {
                          'TodoList__user-button--selected':
                          todo.userId === selectedUserId,
                        },
                      )}
                      type="button"
                      onClick={() => (
                        setSelectedUserId(todo.userId)
                      )}
                    >
                      {`User#${todo.userId}`}
                    </button>
                  )}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
