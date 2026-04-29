import React, { useState } from 'react';

type Props = {
  getFilterType: (type: string) => void;
  handleQueryChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  getFilterType,
  handleQueryChange,
}) => {
  const [query, setQuery] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleQueryChange(event.target.value);
  };

  const handleButton = () => {
    setQuery('');
    handleQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => getFilterType(event.target.value)}
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
