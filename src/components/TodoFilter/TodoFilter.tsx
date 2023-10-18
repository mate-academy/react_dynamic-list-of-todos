import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  onFilterSelect: (e:React.ChangeEvent<HTMLSelectElement>) => void;
  selectValue: string;
  onQueryChange: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterSelect,
  selectValue,
  onQueryChange,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectValue}
          onChange={onFilterSelect}
        >
          {Object.keys(FilterStatus).map(status => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
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
