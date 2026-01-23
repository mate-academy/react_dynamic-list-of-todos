type Props = {
  query: string;
  setQuery: (sentence: string) => void;
  setFilterBy: (sentence: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={event => setFilterBy(event.target.value)}
          data-cy="statusSelect"
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
        value={query}
        onChange={event => setQuery(event.target.value)}
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => setQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
