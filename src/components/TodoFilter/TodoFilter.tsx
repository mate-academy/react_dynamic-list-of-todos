import React, { useState } from 'react';
import { Status } from '../../types/Todo';

type TodoFilterProps = {
  onFilter: (status: Status) => void,
  onTitleFilter: (title: string) => void,
  onClearFilter: () => void,
};

export const TodoFilter
= ({ onFilter, onTitleFilter, onClearFilter }: TodoFilterProps) => {
  const [filterAndQuery, setFilterAndQuery]
  = useState<{ filter: string, query: string }>({
    filter: Status.ALL,
    query: '',
  });

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newFilter = event.target.value as Status;

    setFilterAndQuery(prevState => ({ ...prevState, filter: newFilter }));
    onFilter(newFilter);
  };

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    const newQuery = event.target.value;

    setFilterAndQuery(prevState => ({ ...prevState, query: newQuery }));
    onTitleFilter(newQuery);
  };

  const handleClearButton = () => {
    setFilterAndQuery({ filter: Status.ALL, query: '' });
    onClearFilter();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterAndQuery.filter}
            onChange={handleSelect}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterAndQuery.query}
          onChange={handleSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterAndQuery.query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
