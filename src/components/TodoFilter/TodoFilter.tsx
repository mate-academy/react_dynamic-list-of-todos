import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  status: FilterStatus;
  onStatusChange: (value: FilterStatus) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e => onStatusChange(e.target.value as FilterStatus)}
        >
          <option value={FilterStatus.All}>All</option>
          <option value={FilterStatus.Active}>Active</option>
          <option value={FilterStatus.Completed}>Completed</option>
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
        <span className="icon is-right">
          <button
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
