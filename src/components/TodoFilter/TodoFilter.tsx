type Props = {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryDelete: () => void;
  handleFilterActive: () => void;
  handleFilterCompleted: () => void;
  handleFilterAll: () => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    handleQueryChange,
    query,
    handleQueryDelete,
    handleFilterActive,
    handleFilterCompleted,
    handleFilterAll,
  },
) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    switch (selectedValue) {
      case 'active':
        handleFilterActive();
        break;
      case 'completed':
        handleFilterCompleted();
        break;
      default:
        handleFilterAll();
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
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
          onChange={handleQueryChange}
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
              onClick={handleQueryDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
