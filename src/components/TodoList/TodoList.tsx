import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  selectedUserId: number;
  onSelectedUserId: (number: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onSelectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState('');

  const filterTodos = useMemo(() => (
    todos.filter(todo => {
      const todoTitleToLowerCase = todo.title.toLowerCase();
      const queryToLowerCase = query.toLowerCase();

      return todoTitleToLowerCase.includes(queryToLowerCase);
    })
      .filter(todo => {
        switch (selectedActivities) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'select all':
            return todo;
          default:
            return todo;
        }
      })
  ), [query, todos, selectedActivities]);

  return (
    <div className="TodoList">
      <h2>
        Todos:
      </h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          onChange={
            (event) => setSelectedActivities(event.target.value)
          }
        >
          <option
            value="0"
            disabled
            selected
          >
            select activities
          </option>
          <option>
            active
          </option>
          <option>
            completed
          </option>
          <option>
            select all
          </option>
        </select>
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames('TodoList__item', (todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'
              ))}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                type="button"
                className={classnames(
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                   selectedUserId === todo.userId,
                  },
                  'button',
                )}
                onClick={() => {
                  onSelectedUserId(todo.userId);
                }}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
