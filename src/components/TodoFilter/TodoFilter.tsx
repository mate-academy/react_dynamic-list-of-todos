import React from 'react';

type Props = {
  selectedFilter: string;
  searchBarValue: string;
  getFilter: (filter: string) => void;
  getSearchBarValue: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo((
  {
    getFilter,
    selectedFilter,
    searchBarValue,
    getSearchBarValue,
  },
) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getFilter(event.target.value);
  };

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    getSearchBarValue(event.target.value);
  };

  const clearSearchBar = () => {
    getSearchBarValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelect}
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
          value={searchBarValue}
          onChange={handleSearchBar}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!searchBarValue && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchBar}
            />
          )}
        </span>
      </p>
    </form>
  );
});
