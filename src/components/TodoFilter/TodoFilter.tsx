import React from 'react';

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  setSearchTerm,
  searchTerm,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = () => {
    setSearchTerm('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => setFilter(e.target.value)}
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchTerm && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          )}
        </span>
      </p>
    </form>
  );
};
