type Props = {
  query: string;
  status: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClearQuery,
}) => {
  return (
    <div className="block">
      <div className="field has-addons">
        <div className="control">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={query}
            onChange={event => onQueryChange(event.target.value)}
          />
        </div>

        {query && (
          <div className="control">
            <button
              type="button"
              data-cy="clearSearchButton"
              className="button"
              onClick={onClearQuery}
            >
              x
            </button>
          </div>
        )}
      </div>

      <div className="field">
        <div className="control">
          <div className="select">
            <select
              data-cy="statusSelect"
              value={status}
              onChange={event => onStatusChange(event.target.value)}
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
