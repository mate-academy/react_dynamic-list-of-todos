import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

interface Props {
  setNewTodos: (todos: Todo[]) => void;
  setTodosAreLoaded: (value: boolean) => void;
}

export const TodoFilter: React.FC<Props> = React.memo(({
  setNewTodos,
  setTodosAreLoaded,
}) => {
  const [query, setQuery] = useState('');
  const [sortCondition, setSortCondition] = useState('all');
  const inputValue: React.RefObject<HTMLInputElement> | null = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleClearInput = () => {
    setQuery('');

    if (inputValue.current) {
      inputValue.current.value = '';
    }
  };

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCondition(event.target.value);
  };

  function filterTodos(allTodos: Todo[]) {
    let filteredTodos = allTodos;

    if (query) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sortCondition === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (sortCondition === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    setNewTodos(filteredTodos);
  }

  useEffect(() => {
    setTodosAreLoaded(false);

    getTodos()
      .then(allTodos => {
        filterTodos(allTodos);
      })
      .finally(() => setTodosAreLoaded(true));
  }, [query, sortCondition]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortCondition}
            onChange={handleFilterSelect}
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
          onChange={handleInputChange}
          ref={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue.current?.value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
});
