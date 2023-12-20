import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onFilter: (value: Filter) => void;
  onQuery: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ onFilter, onQuery, query }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => onFilter(e.target.value as Filter)}
          >
            {(Object.keys(Filter) as (keyof typeof Filter)[]).map(key => (
              <option value={Filter[key]}>{key}</option>
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
          onChange={(e) => onQuery(e.target.value)}
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
              onClick={() => onQuery('')}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
