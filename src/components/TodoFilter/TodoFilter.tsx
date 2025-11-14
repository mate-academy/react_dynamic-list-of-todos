export const TodoFilter = () => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect">
          <option value="all" onChange={() => {}}>
            All
          </option>
          <option value="active" onChange={() => {}}>
            Active
          </option>
          <option value="completed" onChange={() => {}}>
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
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        <button data-cy="clearSearchButton" type="button" className="delete" />
      </span>
    </p>
  </form>
);
