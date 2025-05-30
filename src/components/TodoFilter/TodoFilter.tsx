import React, { useRef, useState } from 'react';

type TodoFilterProps = {
  onSelect: (v: string) => void;
  makeQuery: (v: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onSelect,
  makeQuery,
}) => {
  const [filterBy, setFilterBy] = useState('');
  const [query, setQuery] = useState<string>('');
  const setAppliedQuery = useRef<string>('');

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // console.log('In select function...');
    const newFilter = event.target.value.toLowerCase();

    setFilterBy(newFilter);
    onSelect(newFilter);
  };

  const timer = useRef(0);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('In query function...');

    const newQuery = event.target.value;

    setQuery(newQuery);

    clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      setAppliedQuery.current = newQuery;
      makeQuery(newQuery);
    }, 2000);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSelectionChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              makeQuery('');
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
