import React from 'react';

type Props = {
  selectChange: (change: string) => void;
  inputChange: (change: string) => void;
  searchValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  selectChange,
  inputChange,
  searchValue,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectChange(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputChange(event.target.value);
  };

  const handleDelete = () => {
    inputChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
            />
          </span>
        )}
      </p>
    </form>
  );
};
