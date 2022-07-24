export const TodoFilter = () => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Done</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="filterByTitle"
        type="text"
        className="input"
        value="aute"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="delete has-text" />
      </span>
    </p>

    <p className="control">
      <button type="submit" className="button is-success has-text-weight-bold">
        Search
      </button>
    </p>
  </form>
);
