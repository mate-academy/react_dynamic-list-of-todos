type Props = {
  filter: { status: string, query: string },
  onFilterChange(filter: { status: string, query: string }): void,
};

export const TodoFilter = ({ filter, onFilterChange }: Props) => {
  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={(event) => onFilterChange({
                status: event.target.value,
                query: filter.query,
              })}
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
            value={filter.query}
            onChange={(event) => onFilterChange({
              status: filter.status,
              query: event.target.value,
            })}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {filter.query.trim() !== '' && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onFilterChange({
                  status: filter.status,
                  query: '',
                })}
              />
            </span>
          )}
        </p>
      </form>
    </>
  );
};
