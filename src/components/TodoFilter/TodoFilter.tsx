import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

enum SortType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

function getPreparedTodos(
  todos: Todo[],
  sortField: SortType,
  query: string,
): Todo[] {
  let preparedTodos = todos;
  const normalizeQuery = query.trim().toLocaleLowerCase();

  preparedTodos = preparedTodos.filter(todo => {
    switch (sortField) {
      case SortType.active:
        return !todo.completed;
      case SortType.completed:
        return todo.completed;
      case SortType.all:
        return true;
    }
  });
  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizeQuery),
    );
  }

  return preparedTodos;
}

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [sortField, setSortField] = useState<SortType>(SortType.all);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const filtered = getPreparedTodos(todos, sortField, searchQuery);

    setFilteredTodos(filtered);
  }, [todos, sortField, searchQuery, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortField}
            onChange={event => setSortField(event.target.value as SortType)}
          >
            <option value={SortType.all}>All</option>
            <option value={SortType.active}>Active</option>
            <option value={SortType.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
