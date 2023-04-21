import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../helpers';
import { Todos } from '../../enums/Todos';

interface Props {
  onUploadedTodos: Todo[];
  onCurrentTodos: (todos: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({
  onUploadedTodos,
  onCurrentTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Todos.All);

  const handleStatusSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newFilter = event.target.value as Todos;

      setFilter(newFilter);
    }, [setFilter],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;

      setQuery(newQuery);
    }, [setQuery],
  );

  const handleReset = useCallback(() => {
    setQuery('');
  }, [setQuery]);

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
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Delete"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
