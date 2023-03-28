import React, { useCallback } from 'react';

export type FilterTodoStatus = 'all' | 'active' | 'completed';
export interface IFilter {
  status: FilterTodoStatus;
  searchTitle: string;
}

export type OnFilterChange = (filter: IFilter) => void;
interface Props {
  filter: IFilter;
  onChange?: OnFilterChange;
}

export const TodoFilter: React.FC<Props> = ({ onChange, filter }) => {
  const handleStatusChanged = useCallback<
  React.ChangeEventHandler<HTMLSelectElement>
  >(
    (event) => {
      if (onChange !== undefined) {
        const status = event.target.value as FilterTodoStatus;

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
      if (onChange !== undefined) {
        const searchTitle = event.target.value.trim().toLowerCase();

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
    if (onChange !== undefined) {
      const searchTitle = '';

      if (filter.searchTitle !== searchTitle) {
        onChange({ ...filter, searchTitle });
      }
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
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
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

        {filter.searchTitle !== '' && (
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
