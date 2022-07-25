import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onButtonClick: (userId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, onButtonClick }) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [status, setStatus] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const visibleTodos = useMemo(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    return todos.filter(
      todo => todo.title.toLowerCase().includes(lowerQuery)
      && (
        status
          ? String(todo.completed) === status
          : true
      ),
    );
  }, [todos, appliedQuery, status]);

  return (
    <div className="TodoList">
      <label>
        Filter by title
        <input
          type="text"
          name="query"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            applyQuery(event.target.value);
          }}
        />
      </label>

      <select
        name="status"
        id="status"
        value={status}
        onChange={event => setStatus(event.target.value)}
      >
        <option value="">All tasks</option>
        <option value="true">Completed</option>
        <option value="false">Active</option>
      </select>

      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              className={
                classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )
              }
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => onButtonClick(todo.userId)}
              >
                {`User#${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
