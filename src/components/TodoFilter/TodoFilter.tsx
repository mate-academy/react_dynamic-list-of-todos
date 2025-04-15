import React from 'react';
import { FilterType } from '../../FIlterType';

type Props = {
  setFilter: (value: FilterType) => void;
  setSearching: (value: string) => void;
  searching: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setSearching,
  searching,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => setFilter(e.target.value as FilterType)}
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
        onChange={e => setSearching(e.target.value as string)}
        value={searching}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {searching !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearching('')}
          />
        )}
      </span>
    </p>
  </form>
);
