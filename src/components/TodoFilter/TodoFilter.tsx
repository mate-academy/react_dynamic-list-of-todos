interface TodoFilterProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  onFilterChange: (filter: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  handleInputChange,
  query,
  onFilterChange,
  onClearSearch,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange}>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
