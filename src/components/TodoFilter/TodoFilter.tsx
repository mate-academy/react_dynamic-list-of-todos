import { useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setQuery: (query: string) => void,
  query: string,
  setTodos: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  query,
  setTodos,
}) => {
  const [filter, setFilter] = useState<boolean | undefined>(undefined);
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'active') {
      getTodos(false).then(setTodos);
      setFilter(false);
    } else if (selectedValue === 'completed') {
      getTodos(true).then(setTodos);
      setFilter(true);
    } else {
      getTodos().then(setTodos);
      setFilter(undefined);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = event.target.value;

    setQuery(userQuery);
    getTodos(filter, userQuery).then(setTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
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
          onChange={handleInputChange}
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
                onClick={() => {
                  setQuery('');
                  getTodos().then(setTodos);
                }}
              />
            )}
        </span>
      </p>
    </form>
  );
};
