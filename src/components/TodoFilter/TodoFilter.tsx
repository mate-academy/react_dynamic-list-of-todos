import React, { useState } from 'react';

interface TodoFilterType {
  onFilterValue: (value: string) => void;
  onQueryValue?: (value: string) => void;
}

export const TodoFilter = ({
  onFilterValue,
  onQueryValue = () => {},
}: TodoFilterType) => {
  const [value, setValue] = useState('');

  const handleFilter = (filter: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterValue(filter.target.value);
  };

  const handleQuery = (querry: React.ChangeEvent<HTMLInputElement>) => {
    onQueryValue(querry.target.value);
  };

  const resetQuery = () => {
    onQueryValue('');
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilter}>
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
          onChange={input => {
            handleQuery(input);
            setValue(input.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
