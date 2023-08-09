import React from 'react';
import { Sort } from '../../types/Sort';

type Props = {
  onQuerry: (v: string) => void;
  onSortMode: (mode: Sort) => void;
  querry: string;
};

export const TodoFilter: React.FC<Props> = (
  {
    querry,
    onQuerry,
    onSortMode,
  },
) => {
  const handleClearButtonClick = () => {
    onQuerry('');
  };

  const handleQuerryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onQuerry(e.target.value);
  };

  const handleSortModeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onSortMode(e.target.value as Sort);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSortModeChange}
          >
            <option value={Sort.all}>All</option>
            <option value={Sort.active}>Active</option>
            <option value={Sort.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={querry}
          onChange={handleQuerryChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {querry && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearSearchButton"
              onClick={handleClearButtonClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
