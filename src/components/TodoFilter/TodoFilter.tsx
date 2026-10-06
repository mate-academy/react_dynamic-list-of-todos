import React, { useEffect, useState } from 'react';

type Props = {
  setFilterOption: (param: string) => void;
  setInputSearch: (param: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterOption,
  setInputSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleChangeInp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setInputSearch('');
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setInputSearch(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query, setInputSearch]);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            onChange={event => setFilterOption(event.target.value)}
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
          onChange={handleChangeInp}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
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
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
