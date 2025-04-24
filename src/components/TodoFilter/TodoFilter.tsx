import React, { useState } from 'react';
import { Filter } from '../../App';

type Props = {
  onChange: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ onChange }) => {
  const [query, setQuery] = useState<Filter>({ status: 'all', query: '' });

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, query: event.target.value });
    onChange({ ...query, query: event.target.value });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, status: event.target.value });
    onChange({ ...query, status: event.target.value });
  };

  const handleClearInput = () => {
    setQuery({ ...query, query: '' });
    onChange({ ...query, query: '' });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          value={query.query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
