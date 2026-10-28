import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export const TodoFilter = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
}: Props) => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => {
            onStatusChange(event.target.value as TodoStatus);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={event => {
          onQueryChange(event.target.value);
        }}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query !== '' && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Clear search"
            onClick={() => {
              onQueryChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
