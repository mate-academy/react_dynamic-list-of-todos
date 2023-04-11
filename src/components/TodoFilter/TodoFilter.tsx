import React, { useCallback } from 'react';

export enum FilterTodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export interface IFilter {
  status: FilterTodoStatus;
  searchTitle: string;
}

export type OnFilterChange = (filter: IFilter) => void;
interface Props {
  filter: IFilter;
  onChange: OnFilterChange;
}

export const TodoFilter: React.FC<Props> = ({ onChange, filter }) => {
  const handleStatusChanged = useCallback<
  React.ChangeEventHandler<HTMLSelectElement>
  >(
    (event) => {
      if (onChange) {
        const statusValue = event.target.value;
        const status
          = statusValue === FilterTodoStatus.All
          || statusValue === FilterTodoStatus.Active
          || statusValue === FilterTodoStatus.Completed
            ? statusValue
            : FilterTodoStatus.All;

        if (filter.status !== status) {
          onChange({ ...filter, status });
        }
      }
    },
    [filter],
  );

  const handleSearchTitleChanged = useCallback<
  React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (onChange) {
        const searchTitle = event.target.value.toLowerCase();

        if (filter.searchTitle !== searchTitle) {
          onChange({ ...filter, searchTitle });
        }
      }
    },
    [filter],
  );

  const handleSearchTitleClearClicked = useCallback<
  React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    const searchTitle = '';

    if (filter.searchTitle !== searchTitle) {
      onChange({ ...filter, searchTitle });
    }
  }, [filter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleStatusChanged}
          >
            <option value={FilterTodoStatus.All}>All</option>
            <option value={FilterTodoStatus.Active}>Active</option>
            <option value={FilterTodoStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.searchTitle}
          onChange={handleSearchTitleChanged}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.searchTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleSearchTitleClearClicked}
            />
          </span>
        )}
      </p>
    </form>
  );
};
