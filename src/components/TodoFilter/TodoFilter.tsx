interface Props {
  onGetStatusTodos: (choosedTodoStatus: string) => void,
  onGetQuery: (text: string) => void,
  query: string,
}

export const TodoFilter: React.FC<Props> = ({
  onGetStatusTodos,
  onGetQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect">
          <option
            value="all"
            onClick={() => onGetStatusTodos('all')}
          >
            All
          </option>
          <option
            value="active"
            onClick={() => onGetStatusTodos('active')}
          >
            Active
          </option>
          <option
            value="completed"
            onClick={() => onGetStatusTodos('completed')}
          >
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
        value={query}
        onChange={(event) => onGetQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length !== 0 && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onGetQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
