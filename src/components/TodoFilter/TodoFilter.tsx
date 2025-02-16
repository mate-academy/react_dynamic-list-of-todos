import React from 'react';
import { FilterOptions } from '../../types';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  select: FilterOptions;
  onSelectChange: (value: FilterOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  select,
  onSelectChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={select}
          onChange={e => onSelectChange(e.target.value as FilterOptions)}
        >
          <option value={FilterOptions.ALL}>{FilterOptions.ALL}</option>
          <option value={FilterOptions.ACTIVE}>{FilterOptions.ACTIVE}</option>
          <option value={FilterOptions.COMPLETED}>
            {FilterOptions.COMPLETED}
          </option>
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
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
