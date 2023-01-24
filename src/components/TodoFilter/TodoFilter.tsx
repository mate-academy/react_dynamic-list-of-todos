import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { debounce } from 'lodash';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: (FilteredTodos: Todo[]) => void
  todos: Todo[];
};

export const TodoFilter: React.FC<Props> = ({
  onFilter,
  todos,
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState(Filter.ALL);

  const filterByStatus = useCallback(
    () => {
      switch (currentFilter) {
        case Filter.ACTIVE:
          return todos.filter(todo => !todo.completed);
        case Filter.COMPLETED:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    }, [currentFilter, query],
  );

  const clearButton = useCallback(() => {
    setDebouncedQuery('');
    setQuery('');
  }, []);

  const visibleTodos = useMemo(() => {
    return filterByStatus().filter(
      todo => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery, currentFilter]);

  useEffect(() => {
    onFilter(visibleTodos);
  }, [debouncedQuery, currentFilter]);

  const debounceQueryHandler = useCallback(
    debounce(setDebouncedQuery, 500),
    [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => (
              setCurrentFilter(event.target.value as Filter)
            )}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            debounceQueryHandler(event.target.value);
          }}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
