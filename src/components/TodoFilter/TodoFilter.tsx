import React, { useState } from 'react';

type Props = {
  handleFilterTodos: (nameOfFilter: string) => void,
  handleQueryFilter: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  handleFilterTodos,
  handleQueryFilter,
}) => {
  const [value, setValue] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => handleFilterTodos(event.currentTarget.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={(event) => {
            handleQueryFilter(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              aria-label="clearSearchButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                handleQueryFilter('');
                setValue('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
