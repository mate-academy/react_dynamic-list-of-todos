type Props = {
  filterBy: string,
  setFilterBy: React.Dispatch<React.SetStateAction<string>>,
  query:string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
};

export const TodoFilter:React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSortBy}
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
          onChange={handleInput}

        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        { query.trim()
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
