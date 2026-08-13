type Status = 'all' | 'active' | 'completed';

interface Props {
  setSelectedStatus: (status: 'all' | 'active' | 'completed') => void;
  setQuery: (query: string) => void;
  query: string;
  selectedStatus: Status;
}

export const TodoFilter: React.FC<Props> = ({
  setSelectedStatus,
  setQuery,
  query,
  selectedStatus
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={event =>
              setSelectedStatus(
                event.target.value as 'all' | 'active' | 'completed',
              )
            }
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
