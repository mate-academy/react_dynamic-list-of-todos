import React, { useState } from 'react';

type Props = {
  setFilter: (filter: string) => void;
  setFilterTitle: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setFilterTitle }) => {
  const [value, setValue] = useState('all');
  const [input, setInput] = useState('');

  const handleSetFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedValue = event.target.value;

    setValue(selectedValue);
    setFilter(selectedValue);
  };

  const handleSetFilterTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilterTitle(event.target.value);
    setInput(event.target.value);
  };

  const resetFilters = () => {
    setFilter('all');
    setFilterTitle('');
    setValue('all');
    setInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleSetFilter(event)}
            value={value}
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
          onChange={event => handleSetFilterTitle(event)}
          value={input}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {input && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => resetFilters()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
