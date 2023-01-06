import {
  ChangeEvent,
  FC,
  memo,
} from 'react';

interface Props {
  searchInput: string;
  selectedStatus: string;
  handleChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveSearchInput: () => void;
  onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const TodoFilter: FC<Props> = memo(
  ({
    searchInput,
    selectedStatus,
    handleChangeSearchInput,
    handleRemoveSearchInput,
    onStatusChange,
  }) => (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={onStatusChange}
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
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          searchInput
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleRemoveSearchInput}
              />
            </span>
          )
        }
      </p>
    </form>
  ),
);
