import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onUserSelect: (id: number) => void,
  selectedUserId: number
};

const randomizedTodos = (arr: Todo[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const TodoList: React.FC<Props> = ({ todos, onUserSelect, selectedUserId }) => {
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      if (!todo.title.includes(query.toLowerCase())) {
        return false;
      }

      switch (selectValue) {
        case 'all':
          return true;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    }));
  }, [todos, query, selectValue]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        placeholder="Search by title"
        onChange={event => setQuery(event.target.value)}
      />

      <select
        value={selectValue}
        onChange={(event) => setSelectValue(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={() => setVisibleTodos(randomizedTodos([...visibleTodos]))}
      >
        Randomize
      </button>
      {todos.length ? (
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
                key={todo.id}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id={`${todo.id}`}
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => onUserSelect(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : <p>Loading...</p> }
    </div>
  );
};
