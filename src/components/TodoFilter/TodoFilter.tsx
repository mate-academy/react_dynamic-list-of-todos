import React from 'react';

import { SortType } from '../../types/SortType';

interface Props {
  selectParametr: string,
  handleSelect: (selectParametr: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  cleanSearch: () => void,
}

export const TodoFilter: React.FC<Props> = ({
  selectParametr,
  handleSelect,
  query,
  handleSearch,
  cleanSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectParametr}
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value={SortType.all}>All</option>
            <option value={SortType.active}>Active</option>
            <option value={SortType.completed}>Completed</option>
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
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Mute volume"
              onClick={cleanSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
