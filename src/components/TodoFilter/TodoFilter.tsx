import React, { useContext } from 'react';
import { TodoContext } from '../../context';

export const TodoFilter: React.FC = () => {
  const { setStatus, searchField, setSearchField } = useContext(TodoContext);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSearchFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchField(event.target.value);
  };

  const handleClearSearchFieldClick = () => {
    setSearchField('');
  };

  return (
    <form className="field has-addons" onSubmit={(e) => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          onChange={handleSearchFieldChange}
          value={searchField}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchField && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchFieldClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
