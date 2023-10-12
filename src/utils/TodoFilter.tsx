import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  filter: Filter,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
};

export function getFilteredTodos(
  todos: Todo[],
  filter: Filter,
  query: string,
) {
  let filteredTodos = [...todos];

  if (filter) {
    filteredTodos = filteredTodos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return todo;
    });
  }

  if (query) {
    const correctQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos.filter(todo => todo.title
      .toLowerCase().includes(correctQuery));
  }

  return filteredTodos;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
            && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
