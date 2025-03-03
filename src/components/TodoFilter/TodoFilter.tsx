type Prop = {
  ddOption: string;
  setDDOption: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Prop> = ({
  ddOption,
  setDDOption,
  query,
  setQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={ddOption}
          onChange={event => setDDOption(event.target.value)}
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
        className="input"
        placeholder="Search..."
        onChange={event => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Clear search"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
