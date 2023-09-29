import React from 'react';
import { FilterType } from '../../services/variables';

type Props = {
  filterBy: string,
  setFilterBy: (option: FilterType) => void,
  query: string,
  onSetQuery: (option: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  onSetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filterBy}
          data-cy="statusSelect"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterBy(event.target.value as FilterType);
          }}
        >
          {(Object.keys(FilterType) as Array<keyof typeof FilterType>)
            .map(type => (
              <option
                key={type}
                value={type.toLowerCase()}
              >
                {type}
              </option>
            ))}
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
        onChange={(event) => onSetQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {!!query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSetQuery('')}
          >
            {' '}
          </button>
        )}
      </span>
    </p>
  </form>
);
