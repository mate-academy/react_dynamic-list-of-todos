import React, { useEffect, useState } from 'react';

type Props = {
  onSelect: (value: boolean | null) => void;
  onChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onChange }) => {
  // #region select
  const [selectValue, setSelectValue] = useState('');
  const handleSelectValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;

    switch (newValue) {
      case 'active':
        onSelect(false);
        break;

      case 'completed':
        onSelect(true);
        break;

      default:
        onSelect(null);
    }

    setSelectValue(newValue);
  };
  // #endregion

  // #region query
  const [query, setQuery] = useState('');

  const handleQuaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    onChange(query);
  }, [query, onChange]);
  // #endregion

  const handleDeleteBtnClick = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleSelectValueChange}
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
          value={query}
          onChange={handleQuaryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteBtnClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
