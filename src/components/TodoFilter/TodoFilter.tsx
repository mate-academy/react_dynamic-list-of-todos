import React from 'react';
import { Filter } from '../../types/Filter';
import './TodoFilter.scss';

type Props = {
  value: Filter;
  onChange: (next: Filter) => void;
  query: string;
  onQueryChange: (next: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  onChange,
  query,
  onQueryChange,
  onClearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={value}
          onChange={e => onChange(e.target.value as Filter)}
        >
          <option value={Filter.All}>All</option>
          <option value={Filter.Active}>Active</option>
          <option value={Filter.Completed}>Completed</option>
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
        <span className="icon is-right icon--clickable">
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearQuery}
          />
        </span>
      )}
    </p>
  </form>
);
