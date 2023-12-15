import { Status } from '../../types/Status';

interface Props {
  statusFilter: string;
  titleFilter: string;
  setStatusFilter: (status: Status) => void;
  setTitleFilter: (title: string) => void;
}

export const TodoFilter = ({
  statusFilter,
  titleFilter,
  setStatusFilter,
  setTitleFilter,
}: Props) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Status.All:
        setStatusFilter(Status.All);
        break;

      case Status.Active:
        setStatusFilter(Status.Active);
        break;

      case Status.Completed:
        setStatusFilter(Status.Completed);
        break;

      default:
        setStatusFilter(Status.All);
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titleFilter}
          onChange={event => setTitleFilter(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {titleFilter && (
            <button
              aria-label="Delete query"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitleFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
