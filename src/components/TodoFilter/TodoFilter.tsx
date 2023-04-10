interface TodoFilterProps {
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  sortBy: string,
  query: string
}

export const TodoFilter: React.FC<TodoFilterProps> = (props) => {
  const {
    setSortBy,
    setQuery,
    query,
    sortBy,
  } = props;

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSortBy(value);
  };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={onChangeSelect}
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
          onChange={onChangeQuery}
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
};
