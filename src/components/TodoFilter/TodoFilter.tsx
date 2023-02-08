import React from 'react';

import { SortSelectors } from '../../types/SortSelectors';

type Props = {
  query: string,
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onDelete: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSelectChange,
  onInputChange,
  onDelete,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={onSelectChange}
          >
            <option value={SortSelectors.all}>All</option>
            <option value={SortSelectors.active}>Active</option>
            <option value={SortSelectors.completed}>Completed</option>
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
          onChange={onInputChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!query.length || (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onDelete}
              aria-label="clear query"
            />
          </span>
        )}
      </p>
    </form>
  );
};
