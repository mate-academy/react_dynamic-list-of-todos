import { Status } from '../../App';

interface Props {
  status: Status;
  query: string;
  onStatusChange: (status: Status) => void;
  onQueryChange: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onQueryChange,
  onStatusChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'all' || value === 'active' || value === 'completed') {
      onStatusChange(value);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={event => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length !== 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
