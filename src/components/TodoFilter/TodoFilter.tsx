import React from 'react';

import { SortType } from '../../types/SortType';

type Props = {
  query: string,
  onQueryChange: (param: string) => void,
  onSelectChange: (param: SortType) => void,
  sortType: SortType,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onSelectChange,
  sortType,
}) => {
  const hadnleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(+event.target.value as SortType);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={hadnleSelectChange}
            value={sortType}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
