type Props = {
  setStatusFilter: (string: string) => void,
  statusFilter: string,
  setTitleFilter: (string: string) => void,
  titleFilter: string,
};

export const TodoFilter: React.FC<Props> = ({
  setStatusFilter,
  statusFilter,
  setTitleFilter,
  titleFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
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
        value={titleFilter}
        onChange={(event) => setTitleFilter(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {titleFilter && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setTitleFilter('')}
          />
        </span>
      )}
    </p>
  </form>
);
