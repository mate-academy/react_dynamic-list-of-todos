import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { SortType } from '../../types/SortType';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void;
  loading: boolean
}

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilteredTodos,
  loading,
}) => {
  const [query, setQuery] = useState('');
  const [complitedQuery, setComplitedQuery] = useState('');
  const [filter, setFilter] = useState<SortType>(SortType.All);

  useEffect(() => {
    let filteredTodos = [...todos];

    switch (filter) {
      case SortType.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case SortType.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default: break;
    }

    if (complitedQuery) {
      filteredTodos = filteredTodos.filter((todo) => (
        todo.title.toLocaleLowerCase()
          .includes(complitedQuery.toLocaleLowerCase())
      ));
    }

    setFilteredTodos(filteredTodos);
  }, [complitedQuery, filter, loading, setFilteredTodos, todos]);

  const debouncedChangeHandler = useCallback(
    debounce((value) => setComplitedQuery(value), 400),
    [],
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedChangeHandler(value);
  };

  const handleClearQuery = () => {
    setQuery('');
    setComplitedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setFilter(event.target.value as SortType)}
          >
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChangeQuery}
          value={query}
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
              onClick={() => handleClearQuery()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
