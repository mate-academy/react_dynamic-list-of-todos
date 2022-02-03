/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number | null,
  selectUser: (userId: number) => void,
  randomizeTodos: () => void,
  toggleComplete: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos, selectUser, selectedUserId,
  randomizeTodos, toggleComplete,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [renderer, setRenderer] = useState(true);

  const displayedTodos = [...todos]
    .filter(todo => {
      const titleIncludes = todo.title.toLowerCase()
        .includes(searchInput.toLowerCase());

      const idIncludes = todo.id.toString()
        .includes(searchInput.toString());

      return titleIncludes || idIncludes;
    })
    .filter(todo => {
      switch (filterStatus) {
        case 'completed':
          return todo.completed === true;
        case 'not-completed':
          return todo.completed === false;
        case 'not-set':
          return todo.completed === null;
        default:
          return todo;
      }
    });

  useEffect(() => {
    console.log('TodoList render');
  }, [renderer]);

  return (
    <div className="TodoList">
      <h2>{`Todos: ${displayedTodos.length}`}</h2>

      <button
        className="TodoList__randomize-button"
        type="button"
        onClick={() => {
          randomizeTodos();
          setRenderer(!renderer);
        }}
      >
        <p>🔀 Randomize todos</p>
      </button>
      <br />

      <input
        className="TodoList__title-input"
        type="text"
        placeholder="Search title"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
      {'\u00A0'}
      <select
        className="TodoList__status-select"
        onChange={(event) => {
          setFilterStatus(event.target.value);
        }}
      >
        <option value="">Pick status to filter</option>
        <option value="completed">Complete</option>
        <option value="not-completed">Not complete</option>
        <option value="not-set">Not set</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">

          {displayedTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
            >
              <label htmlFor={todo.id.toString()}>
                <input
                  id={todo.id.toString()}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(event) => toggleComplete(+event.target.id)}
                />
                <p>{`${todo.id}: ${todo.title}`}</p>
              </label>

              <button
                className={classNames('TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': selectedUserId === todo.userId })}
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                select
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};
