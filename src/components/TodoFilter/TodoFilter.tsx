type Props = {
  selectAll: string
  selectedTodos:string
  setSelectAll: (select: string) => void
  setSelectedTodos:(select: string) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    selectAll,
    selectedTodos,
    setSelectAll,
    setSelectedTodos,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectAll}
          onChange={(event) => setSelectAll(event.target.value)}
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
        value={selectedTodos}
        onChange={(event) => setSelectedTodos(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {selectedTodos && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSelectedTodos('')}
          />
        </span>

      )}
    </p>
  </form>
);
