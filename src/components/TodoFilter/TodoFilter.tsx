import React from 'react';
import { FilterBySelect } from '../../types/FilterBySelect';

type Props = {
  query: string;
  filterBySelect: string;
  onSetQuery: (value: string) => void;
  onSetFilterBySelect: (value: FilterBySelect) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  query,
  filterBySelect,
  onSetQuery,
  onSetFilterBySelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBySelect}
          onChange={event => {
            onSetFilterBySelect(event.target.value as FilterBySelect);
          }}
        >
          {Object.values(FilterBySelect).map(option => (
            <option
              value={option}
              key={option}
            >
              {option[0].toLocaleUpperCase() + option.slice(1)}
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
        onChange={event => onSetQuery(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="clear"
            onClick={() => onSetQuery('')}
          />
        </span>
      )}
    </p>
  </form>
));
