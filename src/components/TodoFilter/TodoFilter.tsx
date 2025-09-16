import React from 'react';

type Props = {
  statusValue: 'all' | 'active' | 'completed';
  onStatusChange: (value: 'all' | 'active' | 'completed') => void;
  onQueryChange: (value: string) => void;
  searchValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  statusValue,
  onStatusChange,
  onQueryChange,
  searchValue,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as 'all' | 'active' | 'completed');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleDelete = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={statusValue}
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
          onChange={handleInput}
          value={searchValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
              aria-label="Clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
