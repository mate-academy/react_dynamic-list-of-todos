import { Status } from '../../types/Status';

type Props = {
  status: Status,
  onStatusChange: (status: Status) => void,
  query: string,
  onQueryChange: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e => onStatusChange(e.target.value as Status)}
        >
          <option value={Status.All}>All</option>
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
        onChange={e => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            aria-label="close-btn"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
