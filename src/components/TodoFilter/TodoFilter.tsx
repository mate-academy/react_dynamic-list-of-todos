import React from 'react';

import { TodoFilterType, isTodoFilterType } from '../../types/TodoFilter';

type Props = {
  filter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;

  query: string;
  onQueryChange: (query: string) => void;

  onClearSearch: () => void;
};

export const TodoFilterComponent: React.FC<Props> = ({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  onClearSearch,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (!isTodoFilterType(value)) {
      return;
    }

    onFilterChange(value);
  };

  /* eslint-disable no-console */
  console.log('render TodoFilter');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleStatusChange}
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
          onChange={e => onQueryChange(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export const TodoFilter = React.memo(TodoFilterComponent);
