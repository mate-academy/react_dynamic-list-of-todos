import React from 'react';
import { FilterType } from '../../types/Todo';

type Props = {
  query: string,
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void,
  resetQuery: () => void,
  setFilterType: (e: FilterType) => void,
  filterType: FilterType,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  resetQuery,
  setFilterType,
  filterType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
        >
          <option value={FilterType.ALL}>{FilterType.ALL}</option>
          <option value={FilterType.ACTIVE}>{FilterType.ACTIVE}</option>
          <option value={FilterType.COMPLETE}>{FilterType.COMPLETE}</option>
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
        onChange={onChangeQuery}
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
            onClick={resetQuery}
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
