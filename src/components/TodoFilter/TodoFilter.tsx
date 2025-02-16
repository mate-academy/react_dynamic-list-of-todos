import React from 'react';
import { Filters } from '../../types/Filters';

type Props = {
  onChange: ({ query, status }: Filters) => void;
  filters: Filters;
};

export const TodoFilter: React.FC<Props> = ({ onChange, filters }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              onChange({
                ...filters,
                status: event.target.value,
              });
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => {
            onChange({
              ...filters,
              query: event.target.value,
            });
          }}
          value={filters.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                onChange({
                  ...filters,
                  query: '',
                });
              }}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
