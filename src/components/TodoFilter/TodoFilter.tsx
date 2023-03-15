type TodoFilterProps = {
  handleSelectUpdate: (value: string) => void,
  handleQueryUpdate: (value: string) => void,
  query: string,
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  handleSelectUpdate,
  handleQueryUpdate,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => handleSelectUpdate(e.target.value)}
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
        value={query}
        type="text"
        className="input"
        placeholder="Search..."
        onInput={(e) => handleQueryUpdate(e.currentTarget.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleQueryUpdate('')}
          />
        )}
      </span>
    </p>
  </form>
);
