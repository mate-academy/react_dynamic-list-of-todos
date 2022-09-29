enum CompletedStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  selectedStatus: string;
  selectStatus: (state: string) => void,
  selectedQuery: string;
  selectQuery: (search: string) => void,
};

export const TodoFilter: React.FC<Props> = (
  {
    selectStatus, selectedStatus, selectQuery, selectedQuery,
  },
) => {
  const handleStatusSelection = (
    event: { target: { value: string; }; },
  ) => selectStatus(event.target.value);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleStatusSelection}
          >
            <option value={CompletedStatus.All}> All </option>
            <option value={CompletedStatus.Active}> Active </option>
            <option value={CompletedStatus.Completed}> Completed </option>

          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={selectedQuery}
          onChange={(event) => selectQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {selectedQuery.trim()
            && (
              <button
                data-cy="clearSearchButton"
                aria-label="Search clearing"
                type="button"
                className="delete"
                onClick={() => selectQuery('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
