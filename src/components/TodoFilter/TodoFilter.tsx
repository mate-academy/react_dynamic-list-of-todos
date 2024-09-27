import React, { useState } from 'react';

type Props = {
  fisterStatus: string;
  onChangeFisterStatus: (sortField: string) => void;
  onChangeQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  fisterStatus: sortField,
  onChangeFisterStatus: onChangeSortField = () => {},
  onChangeQuery = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleFilterStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChangeSortField(event.currentTarget.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    onChangeQuery(event.currentTarget.value);
  };

  const handleReset = () => {
    setSearchValue('');
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortField}
            onChange={handleFilterStatusChange}
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
          value={searchValue}
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
