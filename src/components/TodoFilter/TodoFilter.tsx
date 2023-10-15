import { Status } from '../../types/StatusState';
import './TodoFilter.css';

type FilterProps = {
  status: Status;
  onStatusChange: (status: Status) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export const TodoFilter: React.FC<FilterProps> = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(event) => {
            onStatusChange(event.target.value as Status);
          }}
        >
          <option value="all" onClick={() => onStatusChange(Status.all)}>
            All
          </option>
          <option value="active" onClick={() => onStatusChange(Status.active)}>
            Active
          </option>
          <option
            value="completed"
            onClick={() => onStatusChange(Status.completed)}
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
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right clear-button">
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
            aria-label="Clear Search"
          />
        )}
      </span>
    </p>
  </form>
);
