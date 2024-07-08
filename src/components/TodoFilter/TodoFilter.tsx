import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  onSelect: (query: SortType) => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onSelect,
  onClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelect(event.target.value as SortType)}
          >
            <option value="all">{SortType.ALL}</option>
            <option value="active">{SortType.ACTIVE}</option>
            <option value="completed">{SortType.COMPLETED}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => onQueryChange(event.target.value)}
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
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
