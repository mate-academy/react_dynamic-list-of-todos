type Props = {
  filter: string;
  query: string;
  onFilterChange: (newFilter: string) => void;
  onQueryChange: (newQuery: string) => void;
  onQueryDelete: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  onFilterChange,
  onQueryChange,
  onQueryDelete,
}) => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const onDelete = () => {
    onQueryDelete();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select" onChange={onSelect}>
          <select data-cy="statusSelect" value={filter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={onDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
