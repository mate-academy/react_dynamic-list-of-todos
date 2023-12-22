import { ChangeEvent } from 'react';
import { useTodoContext } from '../context';

export const TodoFilter = () => {
  const {
    todos, setFilteredTodos, query, setQuery,
  } = useTodoContext();

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value;

    if (!todos) {
      return;
    }

    let filtered = [...todos];

    switch (filter) {
      case 'all':
        setFilteredTodos(filtered);
        break;
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case 'active':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodos(filtered);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option
              value="all"
            >
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
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
          onChange={handleQueryChange}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
