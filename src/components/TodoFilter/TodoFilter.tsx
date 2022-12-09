import React, { useState } from 'react';

type Props = {
  getQuery: (query: string) => void,
  getOption: (option: string) => void,
};

export const TodoFilter: React.FC<Props> = (
  { getQuery, getOption },
) => {
  const [query, setQuery] = useState('');
  const [selectedField, setSelectedFieldy] = useState('all');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedField}
            onChange={(event) => {
              setSelectedFieldy(event.target.value);
              getOption(event.target.value);
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            getQuery(event.target.value);
            setQuery(event.target.value);
          }}
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
              onClick={() => {
                setQuery('');
                getQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
