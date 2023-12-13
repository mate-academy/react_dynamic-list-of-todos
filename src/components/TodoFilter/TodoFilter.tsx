import { StatusFilter } from '../../types/StatusFilter';

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  status: StatusFilter;
  setStatus: (status: StatusFilter) => void;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    status,
    setStatus,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={event => setStatus(event.target.value as StatusFilter)}
          >
            <option value={StatusFilter.ALL}>All</option>
            <option value={StatusFilter.ACTIVE}>Active</option>
            <option value={StatusFilter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
              aria-label="clear"
            />
          </span>
        )}
      </p>
    </form>
  );
};
