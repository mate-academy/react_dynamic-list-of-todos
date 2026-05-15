import { Status, StatusMap } from '../../types/Status';

interface Props {
  status: Status;
  onChangeStatus: (status: Status) => void;
  search: string;
  onChangeSearch: (search: string) => void;
}

export const TodoFilter = ({
  status,
  onChangeStatus,
  search,
  onChangeSearch,
}: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => onChangeStatus(event.target.value as Status)}
        >
          <option value={StatusMap.All}>All</option>
          <option value={StatusMap.Active}>Active</option>
          <option value={StatusMap.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={search}
        onChange={event => onChangeSearch(event.target.value.trimStart())}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {search && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
