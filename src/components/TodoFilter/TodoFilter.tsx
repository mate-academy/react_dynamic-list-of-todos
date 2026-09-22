type Props = {
  filter: (sortby: React.ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  search: (quer: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  search,
  resetQuery,
}) => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={filter}>
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
        value={query}
        placeholder="Search..."
        onChange={search}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={resetQuery}
          />
        </span>
      )}
    </p>
  </form>
);
