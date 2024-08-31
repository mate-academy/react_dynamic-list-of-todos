type Props = {
  query: string | number | undefined;
  filter: 'all' | 'active' | 'completed';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange?: (filter: 'all' | 'active' | 'completed') => void;
  onClearQuery?: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filter,
  onChange = () => {},
  onFilterChange = () => {},
  onClearQuery = () => {},
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as 'all' | 'active' | 'completed');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
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
          onChange={onChange}
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
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
