import React from 'react';
import { FilterType } from '../../types/FilterType';

interface Props {
  setFilterType: (filterType: FilterType) => void;
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  setFilterText,
  filterText,
  setFilterType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterType(event.target.value as FilterType)
          }
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
        value={filterText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFilterText(event.target.value)
        }
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {filterText.length && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setFilterText('')}
          />
        )}
      </span>
    </p>
  </form>
);
