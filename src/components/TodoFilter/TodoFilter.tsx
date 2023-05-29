// import { useState } from 'react';
// import { Todo } from '../../types/Todo';
// import { getTodos } from './api';

type Props = {
  onSelect: (value: string) => void;
  selectValue: string;
  setQuery: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onSelect,
  selectValue,
  setQuery,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={(e) => onSelect(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setQuery('')}
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
