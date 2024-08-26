import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSortList: (sortedTodos: Todo[]) => void;
};

enum SortName {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({ todos, onSortList }) => {
  const [sortBy, setSortBy] = useState(SortName.All);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let filteredTodos = todos;

    if (search) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sortBy) {
      case SortName.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case SortName.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case SortName.All:
      default:
        filteredTodos = filteredTodos;
        break;
    }

    onSortList(filteredTodos);
  }, [sortBy, search, todos, onSortList]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={ev => {
              setSortBy(ev.target.value as SortName);
            }}
          >
            <option value={SortName.All}>All</option>
            <option value={SortName.Active}>Active</option>
            <option value={SortName.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={ev => setSearch(ev.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search.trim() && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
