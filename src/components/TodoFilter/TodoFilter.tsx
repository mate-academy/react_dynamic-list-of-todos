import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  status: Status;
  setStatus: (status: Status) => void;
  query: string;
  setQuery: (query: string) => void;
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  setStatus,
  query,
  setQuery,
  todos,
  setTodos,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    setStatus(newStatus as Status);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleReset = () => {
    setQuery('');
    setStatus(Status.ALL);
    setTodos(todos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
            value={status}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
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
