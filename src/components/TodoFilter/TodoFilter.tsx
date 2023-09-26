type Props = {
  query: string;
  option: string;
  handleOption: (option:string) => void;
  handleQuery: (value:string) => void;
};

export const TodoFilter:React.FC<Props> = ({
  query,
  option,
  handleQuery,
  handleOption,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={option}
          onChange={e => handleOption(e.target.value)}
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
        onChange={e => handleQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {query.trim().length > 0 && (
        <>
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clear search"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQuery('')}
            />
          </span>
        </>
      )}
    </p>
  </form>
);
