// import { useState } from 'react';
// import { getTodos } from '../../api';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  setFilter: (el: Filter) => void;
  query: string;
  setQuery: (el: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  // export const TodoFilter = () => {
  // const [query, setQuery] = useState('');
  // const [filter, setFilter] = useState<Filter>(Filter.All);
  // const [todos, setTodos] = useState<Todo[]>([]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDelete = () => {
    setQuery('');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Filter.All:
        setFilter(Filter.All);
        break;

      case Filter.Active:
        setFilter(Filter.Active);
        break;

      case Filter.Completed:
        setFilter(Filter.Completed);
        break;

      default:
        break;
    }
  };

  // const handleSortAll = () => {
  //   return getTodos().then;
  // };

  // const handleSortActive = () => {
  //   return getTodos().then(items =>
  //     items.filter(todo => todo.completed === false),
  //   );
  // };

  // const handleSortComplete = () => {
  //   return getTodos().then(items =>
  //     items.filter(todo => todo.completed === true),
  //   );
  // };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={handleFilterChange}
            data-cy="statusSelect"
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
          onChange={handleQuery}
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
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
