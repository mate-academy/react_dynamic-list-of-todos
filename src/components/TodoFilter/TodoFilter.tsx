interface Props {
  setFilterBy: (filter: FilterBy) => void;
  setQuery: (query: string) => void;
  query: string;
}

enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  setQuery = () => {},
  query,
}) => {
  const handleResetQuery = () => setQuery('');

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterBy(event.target.value as FilterBy);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterBy}>
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
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
          onChange={handleSetQuery}
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
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
