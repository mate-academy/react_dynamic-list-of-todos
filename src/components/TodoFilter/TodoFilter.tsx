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
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              const selectedValue = e.target.value;

              if (selectedValue === 'active') {
                handleFilterActive();
              } else if (selectedValue === 'completed') {
                handleFilterCompleted();
              } else {
                handleFilterAll();
              }
            }}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleQueryDelete}
          />
        </span>
      </p>
    </form>
  );
};
