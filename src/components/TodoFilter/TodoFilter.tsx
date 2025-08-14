import { StatusFilter } from '../../App';

interface Props {
  query: string;
  onChange: (arg: string) => void;
  onClear: () => void;
  defaultStatus: StatusFilter;
  statusFilter: typeof StatusFilter;
  onStatusChange: (arg: StatusFilter) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onChange,
  onClear,
  defaultStatus,
  statusFilter,
  onStatusChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={defaultStatus}
          onChange={e => onStatusChange(e.target.value as StatusFilter)}
        >
          {Object.values(statusFilter).map(status => (
            <option value={status} key={status}>
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
        onChange={e => onChange(e.currentTarget.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={onClear}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
