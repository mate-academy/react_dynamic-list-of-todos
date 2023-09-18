import React from 'react';
import { Filter, FilterField } from '../../types/Filter';

type Props = {
  onFilter: (filter: Filter) => void;
  filter: Filter
};

export const TodoFilter: React.FC<Props> = ({ onFilter, filter }) => {
  const { filterField, query } = filter;

  const handleChangeFilterField
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter({
      filterField: event.target.value as FilterField,
      query,
    });
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({
      filterField,
      query: event.target.value,
    });
  };

  const handleDeleteQuery = () => {
    onFilter({
      filterField,
      query: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterField}
            onChange={handleChangeFilterField}
          >
            {Object.keys(FilterField).map(option => (
              <option
                key={option}
                value={FilterField[option as keyof typeof FilterField]}
              >
                {option}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
