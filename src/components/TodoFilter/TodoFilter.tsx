type Props = {
  filter: string;
  setQueryHandler: (value: string) => void;
  query: string;
  resetHandler: () => void;
  filterHandler: (value: string) => void;
};

export const TodoFilter:React.FC<Props> = ({
  filter,
  setQueryHandler,
  query,
  resetHandler,
  filterHandler,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => filterHandler(event.target.value)}
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
        onChange={(event) => setQueryHandler(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="submit"
            className="delete"
            onClick={resetHandler}
          />
        )}
      </span>
    </p>
  </form>
);
