import { FilterStatusTypes } from '../../App';

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  status: FilterStatusTypes;
  onStatusChange: (status: FilterStatusTypes) => void;
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
          onChange={event => {
            onStatusChange(event.target.value as FilterStatusTypes)
          }}
        >
          <option value={FilterStatusTypes.All}>All</option>
          <option value={FilterStatusTypes.Active}>Active</option>
          <option value={FilterStatusTypes.Completed}>Completed</option>
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
        onChange={event => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
