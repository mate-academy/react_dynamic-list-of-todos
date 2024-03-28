type Props = {
  onFilterByQuery: (event: string) => void;
  onFilterBy: (event: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterByQuery = () => {},
  onFilterBy = () => {},
  query,
}) => {
  const handleChoose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterBy(event.target.value);
  };

  const handleSearchTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChoose}>
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
          onChange={handleSearchTodos}
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
              onClick={() => {
                onFilterByQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
