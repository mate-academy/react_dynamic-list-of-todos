// import { event } from 'cypress/types/jquery';

import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  onSelectStatus: (status: TodoStatus) => void;
  selectedStatus: TodoStatus;

  searchValue: string;
  onSearchValueChange: (searchValue: string) => void;
  onSearchValueClear: () => void;
};

export const TodoFilter = ({
  onSelectStatus,
  selectedStatus,
  searchValue,
  onSearchValueChange,
  onSearchValueClear,
}: Props) => (
  <form className="field has-addons" onClick={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSelectStatus(event.target.value as TodoStatus)}
          value={selectedStatus}
        >
          <option value={TodoStatus.All}>All</option>
          <option value={TodoStatus.ACTIVE}>Active</option>
          <option value={TodoStatus.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={event =>
          onSearchValueChange(event.target.value.toLowerCase())
        }
        value={searchValue}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onSearchValueClear}
          />
        </span>
      )}
    </p>
  </form>
);
