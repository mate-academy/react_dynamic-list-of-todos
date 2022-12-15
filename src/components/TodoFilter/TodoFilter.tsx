type Props = {
  status: string,
  query: string,
  onChangeStatus: (value: string) => void,
  onChangeQuery: (value: string) => void,
  onChangeApplyQuery: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onChangeStatus,
  onChangeQuery,
  onChangeApplyQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(e) => onChangeStatus(e.target.value)}
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
        onChange={(e) => {
          const value = e.target.value.trimStart();

          onChangeQuery(value);
          onChangeApplyQuery(value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onChangeApplyQuery('');
              onChangeQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
