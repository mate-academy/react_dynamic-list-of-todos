import React from 'react';

type Status = 'all' | 'active' | 'completed';

type Props = {
  filter: (status: Status) => void;
  setValue: (value: string) => void;
  value: string;
};

export const TodoFilter: React.FC<Props> = ({ filter, setValue, value }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filter(e.target.value as Status);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={handleFilterChange} data-cy="statusSelect">
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
          value={value}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {value && (
            <button
              onClick={handleClearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
