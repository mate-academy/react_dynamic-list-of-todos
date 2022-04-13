import React, { useState, useMemo } from 'react';
import './TodoList.scss';

import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
}

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos, selectedUserId, selectUser,
  }) => {
    const [query, setQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');

    const visibledTodos = useMemo(() => (
      todos.filter(todo => {
        const lowerCaseQuery = query.toLowerCase();
        const lowerCaseTitle = todo.title.toLowerCase();

        if (!lowerCaseTitle.includes(lowerCaseQuery)) {
          return false;
        }

        switch (selectedOption) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return true;
        }
      })
    ), [selectedOption, query, todos]);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="TodoList__input"
          type="text"
          placeholder="Search title"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />

        <select
          className="TodoList__input"
          value={selectedOption}
          onChange={event => setSelectedOption(event.target.value)}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibledTodos.map(({
              id, completed, title, userId,
            }) => (
              <li
                key={id}
                className={cn(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !completed },
                  { 'TodoList__item--checked': completed },
                )}
              >
                <label htmlFor={String(id)}>
                  <input
                    type="checkbox"
                    id={String(id)}
                    checked={completed}
                    readOnly
                  />
                  <p className="TodoList__title">
                    {title}
                  </p>
                </label>

                <button
                  className={cn(
                    'TodoList__user-button',
                    // eslint-disable-next-line max-len
                    { 'TodoList__user-button--selected': selectedUserId === userId },
                    'button',
                  )}
                  type="button"
                  onClick={() => {
                    selectUser(userId);
                  }}
                >
                  {`User# ${userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
