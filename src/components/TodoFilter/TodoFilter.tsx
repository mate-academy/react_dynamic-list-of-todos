import React from 'react';
import { FilterType } from '../../services/variables';

type Props = {
  filterBy: string,
  setFilterBy: (option: FilterType) => void,
  query: string,
  onSetQuery: (option: string) => void,
};

const OPTIONS = ['All', 'Completed', 'Active'];

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
          {OPTIONS.map(option => (
            <option value={option.toLowerCase()}>{option}</option>
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
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSetQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
