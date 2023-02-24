type Props = {
  query: string,
  handleQuatyChange: (event: string) => void,
  filterBy: string,
  handleFilteredBy: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query, handleQuatyChange, filterBy, handleFilteredBy,
}) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    handleFilteredBy(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={onSelectChange}
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
          value={query}
          placeholder="Search..."
          onChange={(event) => handleQuatyChange(event.target.value)}
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
              onClick={() => handleQuatyChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
