interface Props {
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  todoStatus: string,
  setTodoStatus: React.Dispatch<React.SetStateAction<string>>,
}

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  todoStatus,
  setTodoStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={todoStatus}
          onChange={event => setTodoStatus(event.target.value)}
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
        value={searchQuery}
        className="input"
        placeholder="Search..."
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setTodoStatus('all');
              setSearchQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
