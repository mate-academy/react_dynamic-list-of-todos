import { memo, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../enums/FilterBy';

type Props = {
  todos: Todo[];
  setFilteredTodos: (newTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  todos,
  setFilteredTodos,
}) => {
  const [completedFilter, setCompletedFilter] = useState(FilterBy.All);
  const [query, setQuery] = useState('');

  const getFilteredTodosBySelect = () => {
    switch (completedFilter) {
      case FilterBy.Active:
        return todos.filter(({ completed }) => !completed);

      case FilterBy.Completed:
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  };

  useEffect(() => {
    const filteredTodosBySelect = getFilteredTodosBySelect();

    const normalizedQuery = query.toLowerCase().trim();

    const filteredByQuery = filteredTodosBySelect.filter(
      ({ title }) => {
        const normalizedTitle = title.toLowerCase();

        return normalizedTitle.includes(normalizedQuery);
      },
    );

    setFilteredTodos(filteredByQuery);
  }, [query, completedFilter]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case FilterBy.Active:
        setCompletedFilter(FilterBy.Active);
        break;

      case FilterBy.Completed:
        setCompletedFilter(FilterBy.Completed);
        break;

      default:
        setCompletedFilter(FilterBy.All);
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={handleSelectChange}
          >
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
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
});
