import { Select } from '../../types/Select';

type Props = {
  onQuery: (query: string) => void;
  query: string;
  onStatus: (value: Select) => void;
  status: string;
};

export const TodoFilter: React.FC<Props> = ({
  onQuery,
  query,
  onStatus,
  status,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(event) => onStatus(event.target.value as Select)}
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
        onChange={(event) => onQuery(event?.target.value)}
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
            onClick={() => onQuery('')}
          >
            Clear
          </button>
        </span>
      )}
    </p>
  </form>
);
