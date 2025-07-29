import React from 'react';

type Props = {
  onChange: (filter: 'all' | 'active' | 'completed') => void;
  onSearchBarChange: (value: string) => void;
  searchQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  onChange,
  onSearchBarChange,
  searchQuery,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as 'all' | 'active' | 'completed');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchBarChange(event.target.value);
  };

  const handleClear = () => {
    onSearchBarChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
          value={searchQuery}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
