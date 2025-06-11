import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoFilterProps = {
  todos: Todo[];
  setVisibleTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  setVisibleTodos,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const normalizeQuery = inputValue.toLowerCase();

    switch (selectedFilter) {
      case 'all':
        setVisibleTodos(
          todos.filter(todo =>
            todo.title.toLowerCase().includes(normalizeQuery),
          ),
        );
        break;
      case 'active':
        setVisibleTodos(
          todos.filter(
            todo =>
              todo.title.toLowerCase().includes(normalizeQuery) &&
              todo.completed !== true,
          ),
        );
        break;
      case 'completed':
        setVisibleTodos(
          todos.filter(
            todo =>
              todo.title.toLowerCase().includes(normalizeQuery) &&
              todo.completed !== false,
          ),
        );
        break;
    }
  }, [inputValue, selectedFilter, setVisibleTodos, todos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={ev => {
              setSelectedFilter(ev.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={ev => {
            setInputValue(ev.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputValue('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
