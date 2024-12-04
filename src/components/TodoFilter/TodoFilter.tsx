import { useState } from 'react';

type Props = {
  getOption: (option: string) => void;
  getSearch: (query: string) => void;
  clearSearch: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  getOption,
  getSearch,
  clearSearch,
}) => {
  const [optionValue, setOptionValue] = useState('all');
  const [query, setQuery] = useState('');

  function handleChangeValue(e: React.ChangeEvent<HTMLSelectElement>) {
    setOptionValue(e.target.value);
    getOption(e.target.value);
  }

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    getSearch(e.target.value);
  }

  function clearSearchResult() {
    setQuery('');
    clearSearch('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeValue}
            value={optionValue}
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
          onChange={search}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchResult}
            />
          )}
        </span>
      </p>
    </form>
  );
};
