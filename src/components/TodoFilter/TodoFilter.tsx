import { TodoStatus } from '../../TodoStatus';

type Props = {
  onSelectStatus: (status: TodoStatus) => void;
  selectedStatus: string;
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
}: Props) => {
  return (
    <form
      className="field has-addons"
      onClick={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelectStatus(event.target.value as TodoStatus)}
            value={selectedStatus}
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
          onChange={event => onSearchValueChange(event.target.value)}
          value={searchValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchValueClear()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
