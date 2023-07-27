import { FilterStatus } from '../enum/enum';

interface Props {
  query: string,
  setQuery: (query: string) => void,
  setFilterStatus: (status: FilterStatus) => void,
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setFilterStatus,
}) => {
  function handleOnChange(value: string): void {
    switch (value) {
      case 'active': {
        setFilterStatus(FilterStatus.ACTIVE);
        break;
      }

      case 'completed': {
        setFilterStatus(FilterStatus.COMPLETED);
        break;
      }

      default: {
        setFilterStatus(FilterStatus.ALL);
        break;
      }
    }
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleOnChange(event.currentTarget.value)}
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
          onChange={event => setQuery(event.currentTarget.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )}
      </p>
    </form>
  );
};
