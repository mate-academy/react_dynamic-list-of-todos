import React from 'react';

export enum FilteringType {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

type Props = {
  searchedText: string;
  handleSearchedText: (text: string) => void;
  handleFilterButton: (filter: FilteringType) => void;
};

export const TodoFilter = ({
  searchedText,
  handleSearchedText,
  handleFilterButton,
}: Props) => {
  const handleFilterButtons = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilteringType;

    handleFilterButton(selectedFilter);
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
          value={searchedText}
          onChange={event => handleSearchedText(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchedText !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              title="clear"
              onClick={() => handleSearchedText('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
