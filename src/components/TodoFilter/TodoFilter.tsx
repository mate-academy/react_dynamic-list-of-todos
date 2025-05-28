import React from 'react';
import { List } from '../../App';

type Props = {
  setFilter: (value: List) => void;
  filter: List;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filter,
  searchFilter,
  setSearchFilter,
}) => {
  const deleteButton = () => {
    setSearchFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => setFilter(e.target.value as List)}
          >
            <option value={List.ALL}>All</option>
            <option value={List.ACTIVE}>Active</option>
            <option value={List.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: List.ALL }}>
          {searchFilter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              onClick={deleteButton}
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
