import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';

interface Props {
  setNewTodos: (todos: Todo[]) => void;
  setIsTodosAreLoaded: (value: boolean) => void;
}

enum SortCondition {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = React.memo(({
  setNewTodos,
  setIsTodosAreLoaded,
}) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(SortCondition.All);
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
    const { value } = event.target;

    switch (value) {
      case 'active':
        setSortBy(SortCondition.Active);
        break;

      case 'completed':
        setSortBy(SortCondition.Completed);
        break;

      default:
        setSortBy(SortCondition.All);
    }
  };

  function filterTodos(allTodos: Todo[]) {
    let filteredTodos = allTodos;

    if (query) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    if (sortBy === SortCondition.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (sortBy === SortCondition.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    setNewTodos(filteredTodos);
  }

  useEffect(() => {
    setIsTodosAreLoaded(false);

    getTodos()
      .then(allTodos => {
        filterTodos(allTodos);
      })
      .finally(() => setIsTodosAreLoaded(true));
  }, [query, sortBy]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
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
