import React from 'react';
import { SelectType } from '../../types/SelectType';

type Props = {
  filterStatus: SelectType;
  onFilterStatusChange: (value: SelectType) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  filterStatus,
  onFilterStatusChange,
  query,
  setQuery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterStatusChange(event.target.value as SelectType);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleSelectChange}
          >
            <option value={SelectType.all}>All</option>
            <option value={SelectType.active}>Active</option>
            <option value={SelectType.completed}>Completed</option>
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
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {(query !== '')
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setQuery('');
                  onFilterStatusChange(SelectType.all);
                }}
              />
            </span>
          )}
      </p>
    </form>
  );
});
