import { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  onUploadedTodos: Todo[];
  onCurrentTodos: (todos: Todo[]) => void;
}

enum Todos {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const filterTodos = (todos: Todo[], filter: Todos, query: string) => {
  return todos.filter((todo) => {
    const fixedTitle = todo.title.toLocaleLowerCase();
    const fixedQuery = query.toLocaleLowerCase();

    const isActive = filter === Todos.Active && !todo.completed;
    const isCompleted = filter === Todos.Completed && todo.completed;

    if (query === '') {
      return (filter === Todos.All || isActive || isCompleted);
    }

    return (filter === Todos.All || isActive || isCompleted)
      && fixedTitle.includes(fixedQuery);
  });
};

export const TodoFilter: React.FC<Props> = ({
  onUploadedTodos,
  onCurrentTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Todos.All);

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as Todos;

    setFilter(newFilter);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
  };

  const handleReset = () => {
    setQuery('');
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(onUploadedTodos, filter, query);
  }, [onUploadedTodos, filter, query]);

  useEffect(() => {
    onCurrentTodos(filteredTodos);
  }, [filteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
            <option value={Todos.All}>All</option>
            <option value={Todos.Active}>Active</option>
            <option value={Todos.Completed}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
           && (
             // eslint-disable-next-line jsx-a11y/control-has-associated-label
             <button
               data-cy="clearSearchButton"
               type="button"
               className="delete"
               onClick={handleReset}
             />
           )}
        </span>
      </p>
    </form>
  );
};
