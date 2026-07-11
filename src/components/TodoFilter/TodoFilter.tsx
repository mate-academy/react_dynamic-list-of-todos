import React from 'react';

type Props = {
  selectStatus: string;
  onStatusChange: (status: string) => void;
  inputValue: string;
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  onStatusChange,
  inputValue,
  onQueryChange,
  onClearQuery,
}) => {
  // Виносимо логіку в іменовані хендлери
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectStatus}
            onChange={handleSelectChange} // Без інлайну
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
          value={inputValue}
          onChange={handleInputChange} // Без інлайну
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery} // Без інлайну
            />
          )}
        </span>
      </p>
    </form>
  );
};
