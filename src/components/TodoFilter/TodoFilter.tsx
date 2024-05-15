import { useContext } from 'react';
import { createdContext } from '../TodoContext';
import React from 'react';

export enum FilteringType {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}

export const TodoFilter = () => {
  const { searchedText, setSearchedText, setFilterButton } =
    useContext(createdContext);

  const handleFilterButtons = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilteringType;

    setFilterButton(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            title="option"
            onChange={handleFilterButtons}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchedText}
          onChange={event => setSearchedText(event.target.value)}
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
            title="clear"
            onClick={() => setSearchedText('')}
          />
        </span>
      </p>
    </form>
  );
};
