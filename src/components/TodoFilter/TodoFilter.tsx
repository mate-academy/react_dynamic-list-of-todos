import React, { Dispatch, SetStateAction } from 'react';
import { Filter } from '../../App';

type TodoFilterProps = {
  filterBy: Filter;
  setFilterBy: (value: 'all' | 'active' | 'completed') => void;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterBy,
  setFilterBy,
  searchText,
  setSearchText,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={e => {
              setFilterBy(e.target.value as Filter);
            }}
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
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchText !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchText('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
