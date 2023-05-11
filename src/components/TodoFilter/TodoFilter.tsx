import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  query: string;
  setQuery: (newQuery: string) => void;
  todoStatusFilter: TodoStatus;
  setTodoStatusFilter: (status: TodoStatus) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  todoStatusFilter,
  setTodoStatusFilter,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatusFilter}
            onChange={(event) => {
              const { value } = event.target;

              if (value !== todoStatusFilter) {
                setTodoStatusFilter(value as TodoStatus);
              }
            }}
          >
            {Object.values(TodoStatus).map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
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
          onChange={handleChange}
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
