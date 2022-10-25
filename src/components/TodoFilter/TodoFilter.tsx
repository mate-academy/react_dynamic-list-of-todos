import { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';

enum Sorted {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[],
  onVisible: (visible: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  onVisible,
}) => {
  const [sortBy, setSortBy] = useState<string>(Sorted.All);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    let sortedTodos;

    switch (sortBy) {
      case Sorted.Active:
        sortedTodos = todos.filter(todo => todo.completed === false);

        break;
      case Sorted.Completed:
        sortedTodos = todos.filter(todo => todo.completed === true);

        break;
      default:
        sortedTodos = [...todos];
    }

    sortedTodos = sortedTodos.filter(todo => {
      return todo.title.includes(query.toLowerCase());
    });

    onVisible(sortedTodos);
  }, [sortBy, query]);

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value={Sorted.All}>All</option>
            <option value={Sorted.Active}>Active</option>
            <option value={Sorted.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSortBy(Sorted.All);
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
