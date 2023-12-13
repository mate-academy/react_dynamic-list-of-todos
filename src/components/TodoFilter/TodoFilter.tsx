import React, { useState } from 'react';

type Props = {
  setFilter: (filter: string) => void;
  setTitleFilter: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setTitleFilter }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setTitleFilter(value);
  };

  const clearQuery = () => {
    setQuery('');
    setTitleFilter('');
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;

    setFilter(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
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
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Search..."
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
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
