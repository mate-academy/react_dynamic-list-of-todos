import { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { SortType } from '../../types/sortType';

interface Props {
  todos: Todo[];
  query: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
}

export const TodoFilter: React.FC<Props> = ({
  todos,
  setTodos,
  query,
  setQuery,
  setSortType,
}) => {
  useEffect(() => {
    setTodos(todos);
  }, [query]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case SortType.All:
        setSortType(SortType.All);
        break;

      case SortType.Active:
        setSortType(SortType.Active);
        break;

      case SortType.Completed:
        setSortType(SortType.Completed);
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            {Object.values(SortType).map(current => (
              <option value={current}>
                {`${current[0].toUpperCase() + current.slice(1)}`}
              </option>
            ))}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear"
              onClick={() => setQuery('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
