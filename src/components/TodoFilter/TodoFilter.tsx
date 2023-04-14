import React, { useState } from 'react';

type Props = {
  onFilter: (select: string, input: string) => void
};

export const TodoFilter:React.FC<Props> = ({ onFilter }) => {
  const [searchField, setField] = useState('');
  const [select, setSelect] = useState('all');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelect(value);
    onFilter(value, searchField);
  };

  const handleSearchFieldChange
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setField(value);
    onFilter(select, value);
  };

  const clearSearchField = () => {
    setField('');
    onFilter(select, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={handleSelectChange}
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
          value={searchField}
          onChange={handleSearchFieldChange}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchField.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
